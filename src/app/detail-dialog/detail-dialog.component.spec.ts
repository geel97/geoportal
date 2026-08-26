import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Feature from 'ol/Feature';
import { AppModule } from '../app.module';
import { DetailDialogComponent } from './detail-dialog.component';

describe('DetailDialogComponent', () => {
  let component: DetailDialogComponent;
  let fixture: ComponentFixture<DetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailDialogComponent],
      imports: [AppModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDialogComponent);
    component = fixture.componentInstance;
    component.data = new Feature({
      id: 10,
      name: 'E2M3A',
      data_types: 'TS',
      dialog_par: 'ATMS,WSPD,WDIR,GSPD,GDIR,DRYT,RELH,SINC,LINC,TEMP,PHPH,PCO2,DOX1',
      type: 'buoy',
      type_name: 'Meteo-marine station',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
