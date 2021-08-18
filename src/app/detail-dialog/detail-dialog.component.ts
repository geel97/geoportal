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
    private dialogRef: MatDialogRef<DetailDialogComponent>
  ) {}

  ngOnInit(): void {}

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

  
  dayFormat(newDate: string): any{

    newDate = new Date(newDate).toUTCString();
    newDate = newDate.split(' ').slice(1, 5).join(' ');
    
    return newDate;
  }
    
}
