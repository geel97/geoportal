import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: Feature<Geometry>,
    private dialogRef: MatDialogRef<DetailDialogComponent>,
    public vocabService: VocabService
  ) {}

  closeModal() {
    this.dialogRef.close();
  }
}
