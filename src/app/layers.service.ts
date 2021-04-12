import { Injectable } from '@angular/core';
import GeoJSON from 'ol/format/GeoJSON';
import Layer from 'ol/layer/Layer';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Injectable({
  providedIn: 'root'
})
export class LayersService {
  
  layers: Layer[] = [];

  constructor() {

    this.layers.push(
      new TileLayer({
        source: new OSM()
      })
    );
    this.layers.push(
      new VectorLayer({
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
        style: new Style({
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
      })
    );


  }

  get Layers(){
    return this.layers;
  }

}
