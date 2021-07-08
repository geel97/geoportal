import { Injectable } from '@angular/core';
import GeoJSON from 'ol/format/GeoJSON';
import Layer from 'ol/layer/Layer';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
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
    osm.set('controls', false);
    this.layers.push(osm);

    let radar = new TileLayer({
      //extent: [-13884991, 2870341, -7455066, 6338219],
      source: new TileWMS({
        url: 'https://thredds.emodnet-physics.eu/thredds/wms/fmrc/GOTlast60days/GOT_Last_60_Days_GOT_HFRadar',
        params: {'LAYERS': 'sea_water_velocity', 'TILED': true, 'STYLES': 'fancyvec/rainbow'},
        serverType: 'geoserver',
      })
    });
    radar.set('legendUrl', (radar.getSource() as TileWMS).getLegendUrl(undefined, { 'TRANSPARENT': true }));
    radar.set('name', 'Radar');
    this.layers.push(radar);
    
    let buoy = new VectorLayer({
        source: new VectorSource({
          url:
            function (extent) {
              return (
                'https://nodc.inogs.it/geoserver/Geoportal/ows' +
                '?service=WFS' +
                '&version=1.0.0' +
                '&request=GetFeature' +
                '&typeName=Geoportal:v_ultimo_dato_erddap' +
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
    buoy.set('name', 'Buoy');
    this.layers.push(buoy);
  }
  
  styleFunction: StyleFunction = (feature: FeatureLike, resolution: number) => {
    switch(feature.get('tipo')){
      case 'buoy':
        return new Style({
          image: new Icon({
            src: 'assets/sea_level.png',
          })
        })
        break;
      default:
        return new Style({
          image: new Icon({
            src: 'assets/buoy.png',
          })
        })
    }
  };
  
}
