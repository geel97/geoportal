import Geometry from 'ol/geom/Geometry';
import WMSCapabilities from 'ol/format/WMSCapabilities';
import { Injectable } from '@angular/core';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import Feature, { FeatureLike } from 'ol/Feature';
import { StyleFunction } from 'ol/style/Style';
import BaseLayer from 'ol/layer/Base';
import XYZ from 'ol/source/XYZ';
import LayerGroup from 'ol/layer/Group';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Stroke from 'ol/style/Stroke';
import { Interaction, defaults, Select } from 'ol/interaction';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DateFunctions } from '../app.misc';
import OlMap from 'ol/Map';


@Injectable({
  providedIn: 'root',
})
export class LayersService {
  layers: BaseLayer[] = [];
  interactions: Interaction[] = defaults().getArray();

  readonly radarTimes$ = new BehaviorSubject<string[]>([]);
  readonly radarTime$ = new BehaviorSubject<string | null>(null);

  radarLayer!: LayerGroup;

  isPlaying = false;
  frameIntervalMs = 500;

  private playInterval: any = null;
  private preloadCache = new Map<string, TileLayer<TileWMS>>();
  private readonly PRELOAD_WINDOW = 3;
  private olMap: OlMap | null = null;

  /** Called by OlMapComponent after the map is initialised so preloading can use the view. */
  registerMap(olMap: OlMap): void {
    this.olMap = olMap;
  }

  play(): void {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.playInterval = setInterval(() => this.stepBy(1), this.frameIntervalMs);
  }

  pause(): void {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    clearInterval(this.playInterval);
    this.playInterval = null;
  }

  stepBy(delta: number): void {
    const times = this.radarTimes$.getValue();
    if (times.length === 0) return;
    const current = this.radarTime$.getValue();
    const idx = current ? times.indexOf(current) : times.length - 1;
    const next = (idx + delta + times.length) % times.length;
    this.radarTime$.next(times[next]);
    this.preloadAround(next);
  }

  private preloadAround(centerIdx: number): void {
    const times = this.radarTimes$.getValue();
    if (!this.olMap || times.length === 0) return;
    const view = this.olMap.getView();
    const resolution = view.getResolution();
    if (resolution === undefined) return;

    for (let delta = 1; delta <= this.PRELOAD_WINDOW; delta++) {
      const idx = (centerIdx + delta) % times.length;
      this.preloadFrame(times[idx]);
    }
  }

  private preloadFrame(timestamp: string): void {
    if (this.preloadCache.has(timestamp) || !this.olMap) return;
    const view = this.olMap.getView();

    const source = new TileWMS({
      url: 'https://dsecho.ogs.it/thredds/wms/radar/NAdr-radar/aggregate.nc',
      params: {
        LAYERS: 'ewct:nsct-group',
        TILED: true,
        STYLES: 'colored_sized_arrows/x-Rainbow',
        COLORSCALERANGE: '0, 0.4',
        ABOVEMAXCOLOR: 'extend',
        BELOWMINCOLOR: 'extend',
        TIME: timestamp,
      },
    });

    const layer = new TileLayer<TileWMS>({ source, opacity: 0 });
    this.preloadCache.set(timestamp, layer);
    this.olMap.addLayer(layer);

    const tileGrid = source.getTileGrid() ?? source.getTileGridForProjection(view.getProjection());
    const extent = view.calculateExtent(this.olMap.getSize());
    const resolution = view.getResolution() ?? 1;
    const zoom = tileGrid?.getZForResolution(resolution) ?? view.getZoom() ?? 0;

    source.on('tileloadend', () => {
      this.olMap?.removeLayer(layer);
    });
    source.on('tileloaderror', () => {
      this.olMap?.removeLayer(layer);
    });

    // Trigger tile loading by loading tiles for the current extent
    tileGrid?.forEachTileCoord(extent, Math.round(zoom), tileCoord => {
      source.getTile(tileCoord[0], tileCoord[1], tileCoord[2], 1, view.getProjection());
    });
  }

  constructor(private http: HttpClient, private matDialog: MatDialog) {
    let osm = new TileLayer({
      source: new OSM(),
    });
    osm.set('name', 'OpenStreetMap');
    osm.set('base', true);
    this.layers.push(osm);

    let bathymetry = new TileLayer({
      source: new TileWMS({
        url: 'https://ows.emodnet-bathymetry.eu/wms',
        params: { LAYERS: 'mean_atlas_land' },
      }),
    });
    bathymetry.set('name', 'EMODnet Bathymetry');
    bathymetry.set('base', true);
    bathymetry.setVisible(false);
    this.layers.push(bathymetry);

    let esri = new TileLayer({
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' + 'World_Imagery/MapServer/tile/{z}/{y}/{x}',
      }),
    });
    esri.set('name', 'ESRI imagery');
    esri.set('base', true);
    esri.setVisible(false);
    this.layers.push(esri);

    let argoPoints = new VectorLayer({
      source: new VectorSource({
        url:
          'https://maosapi.ogs.it/v0.1/time-markers-def' +
          '?type=drifter,float,glider' +
          '&date_from=' +
          DateFunctions.daysAgoMidnightUTC(30).toISOString().substring(0, 10),
        format: new GeoJSON(),
      }),
      style: this.styleByType,
    });
    argoPoints.set('selectable', true);

    let argoTrajectory = new VectorLayer({
      source: new VectorSource(),
      style: feature => {
        return new Style({
          stroke: new Stroke({
            color: feature.get('stroke'),
          }),
        });
      },
    });
    let argo = new LayerGroup({
      layers: [argoTrajectory, argoPoints],
    });
    argo.set('name', 'Argo');
    this.layers.push(argo);

    let argoSelect = new Select({
      layers: [argoPoints],
      style: this.styleByType,
    });
    argoSelect.on('select', e => {
      let argoTrajectorySource = argoTrajectory.getSource()!;
      e.selected.forEach((feature: Feature<any>) => {
        if (argoTrajectorySource.getFeatureById(feature.get('id')) === null)
          this.getArgoTrejectory(feature.get('type'), feature.get('id')).subscribe(
            (response: Feature<Geometry>) => {
              argoTrajectorySource.addFeature(response);
            },
            (error: any) => {
              console.log(error);
            }
          );
        else argoTrajectorySource.removeFeature(argoTrajectorySource.getFeatureById(feature.get('id'))!);
      });
      argoSelect.getFeatures().clear();
    });
    this.interactions.push(argoSelect);

    const radarArrows = new TileLayer({
      preload: 1,
      source: new TileWMS({
        url: 'https://dsecho.ogs.it/thredds/wms/radar/NAdr-radar/aggregate.nc',
        params: {
          LAYERS: 'ewct:nsct-group',
          TILED: true,
          STYLES: 'colored_sized_arrows/x-Rainbow',
          COLORSCALERANGE: '0, 0.4',
          ABOVEMAXCOLOR: 'extend',
          BELOWMINCOLOR: 'extend',
        },
      }),
    });
    const radarPoints = new VectorLayer({
      source: new VectorSource({
        url: function (extent) {
          return (
            'https://nodc.ogs.it/geoserver/Geoportal/ows' +
            '?service=WFS' +
            '&version=1.0.0' +
            '&request=GetFeature' +
            '&typeName=Geoportal:geoportal_radar' +
            '&outputFormat=application/json&srsname=EPSG:3857&' +
            'bbox=' +
            extent.join(',') +
            ',EPSG:3857'
          );
        },
        strategy: bboxStrategy,
        format: new GeoJSON(),
      }),
      style: new Style({
        image: new Icon({
          src: 'assets/radar.png',
          scale: 1.0,
        }),
      }),
    });
    const radar = new LayerGroup({
      layers: [radarArrows, radarPoints],
    });
    radar.set(
      'legendUrl',
      (radarArrows.getSource() as TileWMS).getLegendUrl(undefined, {
        COLORBARONLY: true,
        PALETTE: 'x-Rainbow',
        WIDTH: 25,
        HEIGHT: 150,
      })
    );
    radar.set('legendRange', [0, 0.4]);
    radar.set('legendUnit', 'm/s');
    radar.set('name', 'Radar');
    this.layers.push(radar);
    this.radarLayer = radar;

    const capabilitiesUrl =
      radarArrows.getSource()!.getUrls()?.[0] + '?REQUEST=GetCapabilities&SERVICE=WMS&VERSION=1.3.0';
    this.http
      .get(capabilitiesUrl, { responseType: 'text' })
      .pipe(
        map((text: string) => {
          const result = new WMSCapabilities().read(text);
          const times: string[] =
            result.Capability.Layer.Layer[0].Layer[3].Layer[0].Dimension[0].values.split(',');
          return times;
        })
      )
      .subscribe({
        next: (times: string[]) => {
          radar.set('times', times);
          this.radarTimes$.next(times);
          this.radarTime$.next(times[times.length - 1]);
        },
        error: err => console.error('Failed to fetch radar capabilities', err),
      });

    this.radarTime$.subscribe((timestamp: string | null) => {
      if (timestamp !== null) {
        radarArrows.getSource()!.updateParams({ TIME: timestamp });
      }
    });

    let stations = new VectorLayer({
      source: new VectorSource({
        url: function (extent) {
          return (
            'https://nodc.ogs.it/geoserver/Geoportal/ows' +
            '?service=WFS' +
            '&version=1.0.0' +
            '&request=GetFeature' +
            '&typeName=Geoportal:geoportal_stations' +
            '&outputFormat=application/json&srsname=EPSG:3857&' +
            'bbox=' +
            extent.join(',') +
            ',EPSG:3857'
          );
        },
        strategy: bboxStrategy,
        format: new GeoJSON(),
      }),
      style: this.styleByType,
    });
    stations.set('name', 'Stations');
    stations.set('selectable', true);
    this.layers.push(stations);

    let stationsSelect = new Select({
      layers: [stations],
      style: this.styleByType,
    });
    stationsSelect.on('select', e => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.data = e.selected[0];
      const modalDialog = this.matDialog.open(DetailDialogComponent, dialogConfig);
      modalDialog.afterClosed().subscribe(() => {
        stationsSelect.getFeatures().clear();
      });
    });
    this.interactions.push(stationsSelect);
  }

  styleByType: StyleFunction = (feature: FeatureLike, resolution: number) => {
    switch (feature.get('type')) {
      case 'buoy':
        return new Style({
          image: new Icon({
            src: 'assets/buoy.png',
            scale: 1.0,
          }),
        });
      case 'current':
        return new Style({
          image: new Icon({
            src: 'assets/sea_level.png',
            scale: 1.0,
          }),
        });
      case 'waverider':
        return new Style({
          image: new Icon({
            src: 'assets/station.png',
            scale: 1.0,
          }),
        });
      case 'drifter':
        return new Style({
          image: new Icon({
            src: 'assets/drifter.png',
            scale: 0.5,
          }),
        });
      case 'float':
        return new Style({
          image: new Icon({
            src: 'assets/float.png',
            scale: 0.8,
          }),
        });
      case 'glider':
        return new Style({
          image: new Icon({
            src: 'assets/glider.png',
            scale: 0.8,
          }),
        });
      case 'radar':
        return new Style({
          image: new Icon({
            src: 'assets/radar.png',
            scale: 0.5,
          }),
        });
      default:
        return undefined;
    }
  };

  getArgoTrejectory(type: string, id: number): Observable<Feature<Geometry>> {
    let url = 'https://maosapi.ogs.it/v0.1/trajectory?' + 'type=' + type + '&id=' + id;

    return this.http.get(url).pipe(
      map((result: any) => {
        let feature = new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(result)[0];
        feature.setId(id);
        return feature;
      })
    );
  }
}
