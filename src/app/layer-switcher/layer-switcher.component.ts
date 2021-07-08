import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import Layer from 'ol/layer/Layer';
import { LayersService } from '../layers.service';

@Component({
  selector: 'app-layer-switcher',
  templateUrl: './layer-switcher.component.html',
  styleUrls: ['./layer-switcher.component.css']
})
export class LayerSwitcherComponent {

  layers: Layer[];

  constructor(service: LayersService) { 
    this.layers = service.layers;
  }

  onChange(event: MatSlideToggleChange, index: number): void {
    this.layers[index].setVisible(event.checked);
  }
  
}
