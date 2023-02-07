import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { OlMapComponent } from './ol-map.component';

describe('OlMapComponent', () => {
  let component: OlMapComponent;
  let fixture: ComponentFixture<OlMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OlMapComponent],
      imports: [HttpClientModule, MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
