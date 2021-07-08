import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionsDialogComponent } from './attributions-dialog.component';

describe('AttributionsComponent', () => {
  let component: AttributionsDialogComponent;
  let fixture: ComponentFixture<AttributionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
