import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ErddapService } from './services/erddap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent {
  title = 'geoportal';

  constructor(private erdappService: ErddapService) {}
}
