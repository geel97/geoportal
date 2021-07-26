import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import Layer from 'ol/layer/Layer';
import SourceType from 'ol/source/Source';
import { LayersService } from '../layers.service';

@Component({
  selector: 'app-layer-switcher',
  templateUrl: './layer-switcher.component.html',
  styleUrls: ['./layer-switcher.component.scss']
})
export class LayerSwitcherComponent {

  layers: Layer<SourceType>[];

  constructor(service: LayersService) { 
    this.layers = service.layers;
  }

  onChange(event: MatSlideToggleChange, index: number): void {
    this.layers[index].setVisible(event.checked);
  }
  
}
