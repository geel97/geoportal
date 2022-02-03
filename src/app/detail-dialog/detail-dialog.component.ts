import { DataType, ErddapService, Measurement } from './../erddap.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss'],
})
export class DetailDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Collection<Feature<Geometry>>,
    private dialogRef: MatDialogRef<DetailDialogComponent>,
    private erdappService: ErddapService
  ) {
    this.cardsMeasurement = new Array<Measurement>();
  }
  description: string = this.data.item(0).get('descriptio');
  cardsMeasurement;

  ngOnInit(): void {
    this.data
      .item(0)
      .get('dialog_par')
      .split(',')
      .forEach((param: string) => {
        this.erdappService
          .getData(
            this.data.item(0).get('name'),
            { name: param, type: DataType.TIME_SERIES },
            new Date(Date.now() - 86400000 * 2),
            new Date(Date.now()),
            true
          )
          .subscribe(
            (response: any) => {
              this.cardsMeasurement = this.cardsMeasurement.concat(response);
              console.log(this.cardsMeasurement);
            },
            (error: any) => console.log(error)
          );
      });
  }

  closeModal() {
    this.dialogRef.close();
    console.log(this.cardsMeasurement);
  }

  featureKeysFilter(value: string, index: number, array: string[]): boolean {
    // TODO: Filter out anything is not a mesurment
    return value.startsWith('P01_');
  }

  daysElapsed(timestamp: string): number {
    return (Date.now() - Date.parse(timestamp)) / (1000 * 60 * 60 * 24);
  }

  dayFormat(timestamp: Date): string {
    return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
}
