import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import Layer from 'ol/layer/Layer';
import SourceType from 'ol/source/Source';
import { LayersService } from '../layers.service';

@Component({
  selector: 'app-layer-switcher',
  templateUrl: './layer-switcher.component.html',
  styleUrls: ['./layer-switcher.component.scss'],
})
export class LayerSwitcherComponent {
  layers: Layer<SourceType>[];
  isCollapsed: boolean = false;

  constructor(service: LayersService) {
    this.layers = service.layers;
  }

  onChange(event: MatSlideToggleChange, index: number): void {
    this.layers[index].setVisible(event.checked);
  }

  onChangeBaseLayer(event: MatRadioChange): void {
    this.layers.filter(this.isBaseLayer).forEach(element => {
      element.setVisible(false);
    });
    this.layers[event.value].setVisible(event.source.checked);
  }

  isBaseLayer(layer: Layer<SourceType>): boolean {
    return layer.get('base');
  }
}
