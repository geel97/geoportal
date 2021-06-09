import { Injectable } from '@angular/core';
import GeoJSON from 'ol/format/GeoJSON';
import Layer from 'ol/layer/Layer';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import { FeatureLike } from 'ol/Feature';
import { StyleFunction} from 'ol/style/Style';

@Injectable({
  providedIn: 'root'
})
export class LayersService {
  
  layers: Layer[] = [];

  constructor() {

    let osm = new TileLayer({
      source: new OSM()
    });
    osm.set('name', 'OpenStreetMap');
    this.layers.push(osm);

    let radar = new TileLayer({
      //extent: [-13884991, 2870341, -7455066, 6338219],
      source: new TileWMS({
        url: 'https://thredds.emodnet-physics.eu/thredds/wms/fmrc/GOTlast60days/GOT_Last_60_Days_GOT_HFRadar',
        params: {'LAYERS': 'sea_water_velocity', 'TILED': true, 'STYLES': 'fancyvec/rainbow'},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        //transition: 0,
      })
    });
    radar.set('name', 'radar');
    this.layers.push(radar);

    let buoy = new VectorLayer({
        source: new VectorSource({
          url:
            function (extent) {
              return (
                'https://nodc.inogs.it/geoserver/Litter/ows' +
                '?service=WFS' +
                '&version=1.0.0' +
                '&request=GetFeature' +
                '&typeName=Litter:beaches_catalog' +
                '&outputFormat=application/json&srsname=EPSG:3857&' +
                'bbox=' +
                extent.join(',') +
                ',EPSG:3857'
              )
            },
          strategy: bboxStrategy,
          format: new GeoJSON()
        }),
        style: this.styleFunction
      });
    buoy.set('name', 'buoy');
    this.layers.push(buoy);
  }
  
  styleFunction: StyleFunction = (feature: FeatureLike, resolution: number) => {
    switch(feature.get('survey_types')){
      case 'MSFD_monitoring':
        return new Style({
          image: new Circle({
            fill: new Fill({
              color: 'rgba(0,0,255,0.4)'
            }),
            stroke: new Stroke({
              color: '#0099CC',
              width: 1.25
            }),
            radius: 5
          })
        })
        break;
      default:
        return new Style({
          image: new Circle({
            fill: new Fill({
              color: 'rgba(255,255,255,0.4)'
            }),
            stroke: new Stroke({
              color: '#3399CC',
              width: 1.25
            }),
            radius: 5
          })
        })
    }
  };
}
