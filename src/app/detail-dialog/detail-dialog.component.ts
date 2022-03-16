import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import { VocabService } from '../services/vocab.service';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss'],
})
export class DetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Collection<Feature<Geometry>>,
    private dialogRef: MatDialogRef<DetailDialogComponent>,
    public vocabService: VocabService
  ) {}

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
