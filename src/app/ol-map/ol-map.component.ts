import { LayersService } from './../layers.service';
import { Component, OnInit } from '@angular/core';
import { View, Feature, Map } from 'ol';
import Layer from 'ol/layer/Layer';
import Select from 'ol/interaction/Select';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { AttributionsDialogComponent } from '../attributions-dialog/attributions-dialog.component';
import { Zoom } from 'ol/control';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements OnInit {

  map!: Map;
  layers: Layer[];
  select: Select;

  constructor(service: LayersService, public matDialog: MatDialog) { 
    this.layers = service.layers;
    this.select = new Select({
      style: service.styleFunction,
    });
  }

  openAttributionsDialog() {
    this.matDialog.open(AttributionsDialogComponent);
  }

  ngOnInit():void{
    this.map = new Map({
      target: 'map',
      layers: this.layers,
      controls: [new Zoom()],
      view: new View({
        center: [1513911.782216, 5725592.040729],
        zoom: 11
      }),
    });

    this.map.addInteraction(this.select);
    this.select.on('select',  (e) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.data = this.select.getFeatures();
      const modalDialog = this.matDialog.open(DetailDialogComponent, dialogConfig);
      modalDialog.afterClosed().subscribe(() => {
        this.select.getFeatures().clear();
      });
    })
  }
  
}
