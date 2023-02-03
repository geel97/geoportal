import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { LayerSwitcherComponent } from './layer-switcher.component';

describe('LayerSwitcherComponent', () => {
  let component: LayerSwitcherComponent;
  let fixture: ComponentFixture<LayerSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayerSwitcherComponent],
      imports: [HttpClientModule, MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
