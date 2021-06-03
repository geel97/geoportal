import { LayersService } from './../layers.service';
import { Component, OnInit } from '@angular/core';
import { View, Feature, Map } from 'ol';
import {Coordinate} from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls, ZoomToExtent} from 'ol/control';
//import proj4 from 'proj4';
import * as olProj from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import Projection from 'ol/proj/Projection';
import {register}  from 'ol/proj/proj4';
import {get as GetProjection} from 'ol/proj'
import {Extent} from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import { defaults as defaultControls } from 'ol/control';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Circle, Fill, Stroke, Style, Text} from 'ol/style';
import Vector from 'ol/source/Vector';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import Layer from 'ol/layer/Layer';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements OnInit {
  map!: Map;
  layers: Layer[];

  constructor(service: LayersService) { 
    this.layers = service.layers;
  }

  ngOnInit():void{
    this.map = new Map({
      target: 'map',
      layers: this.layers/*[
        new TileLayer({
          source: new OSM()
        }),
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
      ]*/,
      view: new View({
        center: [1513911.782216, 5725592.040729],
        zoom: 11
      }),
      /*controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            813079.7791264898, 5929220.284081122,
            848966.9639063801, 5936863.986909639
          ]
        })
      ])*/
    });
  }

}
