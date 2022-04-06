import { Injectable } from '@angular/core';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import { FeatureLike } from 'ol/Feature';
import { StyleFunction } from 'ol/style/Style';
import BaseLayer from 'ol/layer/Base';
import XYZ from 'ol/source/XYZ';
import LayerGroup from 'ol/layer/Group';

@Injectable({
  providedIn: 'root',
})
export class LayersService {
  layers: BaseLayer[] = [];

  constructor() {
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

    let radarArrows = new TileLayer({
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
    let radarPoints = new VectorLayer({
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
    let radar = new LayerGroup({
      layers: [radarArrows, radarPoints],
    });
    radar.set(
      'legendUrl',
      (radarArrows.getSource() as TileWMS).getLegendUrl(undefined, {
        TRANSPARENT: true,
        COLORSCALERANGE: '0, 0.4',
        STYLES: 'vector_arrows/x-Rainbow',
        bgcolor: '0xFFFFFF',
      })
    );
    radar.set('name', 'Radar');
    this.layers.push(radar);

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
      style: this.styleFunction,
    });
    stations.set('name', 'Stations');
    stations.set('detail-dialog', true);
    this.layers.push(stations);
  }

  styleFunction: StyleFunction = (feature: FeatureLike, resolution: number) => {
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
      default:
        return new Style({
          image: new Icon({
            src: 'assets/buoy.png',
            scale: 1.0,
          }),
        });
    }
  };
}