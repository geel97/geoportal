import { DataType, ErddapService, Measurement, Parameter } from './../erddap.service';
import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import { VocabService } from '../vocab.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss'],
})
export class DetailDialogComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Collection<Feature<Geometry>>,
    private dialogRef: MatDialogRef<DetailDialogComponent>,
    private erdappService: ErddapService,
    public vocabService: VocabService
  ) {}

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  cardsMeasurement = new MatTableDataSource();
  description: string = this.data.item(0).get('descriptio');
  loading = 0;
  displayedColumns: string[] = ['parameter', 'measurement', 'depth', 'timestamp'];

  ngOnInit(): void {
    let dialogParam = this.data.item(0).get('dialog_par').split(',');

    dialogParam.map((param: string, index: number) => {
      this.loading++;
      this.erdappService
        .getLastMeasurements(
          this.data.item(0).get('name'),
          { name: param, type: DataType.TIME_SERIES },
          this.daysAgoMidnightUTC(7)
        )
        .subscribe(
          (response: Measurement[]) => {
            this.cardsMeasurement.data = this.cardsMeasurement.data.concat(response);
            (this.cardsMeasurement.data as Measurement[]).sort(
              (a, b) => dialogParam.indexOf(a.parameter.name) - dialogParam.indexOf(b.parameter.name)
            );
            this.cardsMeasurement._updateChangeSubscription();
            console.log(this.cardsMeasurement.data);
          },
          (error: any) => {
            this.loading--;
            console.log(error);
          },
          () => this.loading--
        );
    });
  }

  ngAfterViewInit(): void {
    this.cardsMeasurement.paginator = this.paginator;
    this.cardsMeasurement.sort = this.sort;
    this.cardsMeasurement.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'parameter':
          return this.vocabService.getMeasurementName((item as Measurement).parameter.name);
        default:
          return (item as any)[property];
      }
    };
  }

  closeModal() {
    this.dialogRef.close();
  }

  featureKeysFilter(value: string, index: number, array: string[]): boolean {
    // TODO: Filter out anything is not a mesurment
    return value.startsWith('P01_');
  }

  daysElapsed(timestamp: string): number {
    return (Date.now() - Date.parse(timestamp)) / (1000 * 60 * 60 * 24);
  }

  dayFormat(timestamp: Date): string {
    return new Date(timestamp).toLocaleTimeString([], {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  midnightUTC(): Date {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  daysAgoMidnightUTC(days: number): Date {
    let date = this.midnightUTC();
    date.setDate(date.getDate() - days);
    return date;
  }
}
