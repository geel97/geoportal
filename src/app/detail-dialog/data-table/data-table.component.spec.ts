import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import Feature from 'ol/Feature';

import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
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
