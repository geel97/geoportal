import { Component, OnInit } from '@angular/core';
import { DataType, ErddapService } from './erddap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'geoportal';

  constructor(private erdappService: ErddapService) {}
  ngOnInit() {
    /* this.erdappService
      .getData(
        'E2M3A',
        { name: 'WDIR', type: DataType.TIME_SERIES },
        new Date(Date.now() - 86400000 * 2),
        new Date(Date.now() - 86400000), true
      )
      .subscribe(
        (response: any) => console.log(response),
        (error: any) => console.log(error)
      );*/
  }
}
