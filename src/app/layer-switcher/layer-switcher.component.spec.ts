import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerSwitcherComponent } from './layer-switcher.component';

describe('LayerSwitcherComponent', () => {
  let component: LayerSwitcherComponent;
  let fixture: ComponentFixture<LayerSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerSwitcherComponent ]
    })
    .compileComponents();
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
