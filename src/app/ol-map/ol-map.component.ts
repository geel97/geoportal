import { LayersService } from '../services/layers.service';
import { Component, OnInit } from '@angular/core';
import { View, Map } from 'ol';
import Select from 'ol/interaction/Select';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { AttributionsDialogComponent } from '../attributions-dialog/attributions-dialog.component';
import { easeOut } from 'ol/easing';
import BaseLayer from 'ol/layer/Base';
import Layer from 'ol/layer/Layer';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import Geometry from 'ol/geom/Geometry';
import LayerGroup from 'ol/layer/Group';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.scss'],
})
export class OlMapComponent implements OnInit {
  map!: Map;
  layers: BaseLayer[];
  select: Select;
  selectArgo: Select;
  layersService;

  constructor(service: LayersService, private matDialog: MatDialog) {
    this.layers = service.layers;
    this.layersService = service;
    this.select = new Select({
      layers: (layer: Layer<any>) => {
        return layer.get('detail-dialog');
      },
      style: service.styleFunction,
    });
    this.selectArgo = new Select({
      layers: (layer: Layer<any>) => {
        return layer.get('click');
      },
      style: service.styleArgo,
    });
  }

  openAttributionsDialog() {
    this.matDialog.open(AttributionsDialogComponent);
  }

  ngOnInit(): void {
    console.log(this.layers.filter((layer: BaseLayer) => layer.get('name') == 'Argo') as Layer<any>[]);
    this.map = new Map({
      target: 'map',
      layers: this.layers,
      controls: [],
      view: new View({
        center: [1685283.599632, 5360375.919583],
        zoom: 7,
        enableRotation: false,
      }),
    });
    this.map.addInteraction(this.select);
    this.select.on('select', e => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.data = this.select.getFeatures();
      const modalDialog = this.matDialog.open(DetailDialogComponent, dialogConfig);
      modalDialog.afterClosed().subscribe(() => {
        this.select.getFeatures().clear();
      });
    });

    this.map.addInteraction(this.selectArgo);

    this.selectArgo.on('select', e => {
      this.selectArgo.getFeatures().forEach((feature: Feature<any>) => {
        this.layersService.getArgoTrejectory(feature.get('type'), feature.get('id')).subscribe(
          (response: Feature<Geometry>) => {
            (
              (this.layers.find(layer => layer.get('name') == 'Argo') as LayerGroup)
                .getLayersArray()[0]
                .getSource() as VectorSource<Geometry>
            ).addFeature(response);
          },
          (error: any) => {
            console.log(error);
          }
        );
      });
    });
  }

  /**
   * Code taken from: @module ol/control/Zoom
   * @param {number} delta Zoom delta.
   * @param {duration} duration Animation duration in milliseconds (default 250).
   * @private
   */
  zoomByDelta(delta: number, duration: number = 250) {
    const view = this.map.getView();
    if (!view) {
      // the map does not have a view, so we can't act
      // upon it
      return;
    }
    const currentZoom = view.getZoom();
    if (currentZoom !== undefined) {
      const newZoom = view.getConstrainedZoom(currentZoom + delta);
      if (duration > 0) {
        if (view.getAnimating()) {
          view.cancelAnimations();
        }
        view.animate({
          zoom: newZoom,
          duration: duration,
          easing: easeOut,
        });
      } else {
        view.setZoom(newZoom);
      }
    }
  }
}
