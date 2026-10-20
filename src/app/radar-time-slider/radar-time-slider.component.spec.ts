import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RadarTimeSliderComponent } from './radar-time-slider.component';
import { LayersService } from '../services/layers.service';

const TIMES = ['2024-01-01T00:00:00Z', '2024-01-01T01:00:00Z', '2024-01-01T02:00:00Z'];

function createMockLayersService() {
  return {
    radarTimes$: new BehaviorSubject<string[]>([]),
    radarTime$: new BehaviorSubject<string | null>(null),
    radarLayer: { getVisible: () => true },
    isPlaying: false,
    frameIntervalMs: 1000,
    play: jasmine.createSpy('play'),
    pause: jasmine.createSpy('pause'),
    stepBy: jasmine.createSpy('stepBy'),
  } as unknown as LayersService;
}

describe('RadarTimeSliderComponent', () => {
  let component: RadarTimeSliderComponent;
  let fixture: ComponentFixture<RadarTimeSliderComponent>;
  let mockService: ReturnType<typeof createMockLayersService>;

  beforeEach(async () => {
    mockService = createMockLayersService();

    await TestBed.configureTestingModule({
      declarations: [RadarTimeSliderComponent],
      providers: [{ provide: LayersService, useValue: mockService }, DatePipe],
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatSelectModule,
        MatSliderModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RadarTimeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render the card when times is empty', () => {
    const card = fixture.debugElement.query(By.css('.radar-slider-card'));
    expect(card).toBeNull();
  });

  it('should render the card after times are emitted', () => {
    (mockService.radarTimes$ as BehaviorSubject<string[]>).next(TIMES);
    (mockService.radarTime$ as BehaviorSubject<string | null>).next(TIMES[2]);
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('.radar-slider-card'));
    expect(card).not.toBeNull();
  });

  it('should set selectedIndex to the last frame on init when times arrive', () => {
    (mockService.radarTimes$ as BehaviorSubject<string[]>).next(TIMES);
    fixture.detectChanges();
    expect(component.selectedIndex).toBe(TIMES.length - 1);
  });

  it('should call stepBy(-1) when step-back button is clicked', () => {
    (mockService.radarTimes$ as BehaviorSubject<string[]>).next(TIMES);
    fixture.detectChanges();
    const btn = fixture.debugElement.queryAll(By.css('[mat-icon-button]'))[0];
    btn.triggerEventHandler('click', null);
    expect(mockService.stepBy).toHaveBeenCalledWith(-1);
  });

  it('should call stepBy(1) when step-forward button is clicked', () => {
    (mockService.radarTimes$ as BehaviorSubject<string[]>).next(TIMES);
    fixture.detectChanges();
    const btn = fixture.debugElement.queryAll(By.css('[mat-icon-button]'))[2];
    btn.triggerEventHandler('click', null);
    expect(mockService.stepBy).toHaveBeenCalledWith(1);
  });

  it('should call play() when play/pause toggled while not playing', () => {
    mockService.isPlaying = false;
    (mockService.radarTimes$ as BehaviorSubject<string[]>).next(TIMES);
    fixture.detectChanges();
    component.togglePlayPause();
    expect(mockService.play).toHaveBeenCalled();
  });

  it('should call pause() when play/pause toggled while playing', () => {
    mockService.isPlaying = true;
    (mockService.radarTimes$ as BehaviorSubject<string[]>).next(TIMES);
    fixture.detectChanges();
    component.togglePlayPause();
    expect(mockService.pause).toHaveBeenCalled();
  });

  it('should push the selected time to radarTime$ on slider change', () => {
    (mockService.radarTimes$ as BehaviorSubject<string[]>).next(TIMES);
    fixture.detectChanges();
    component.onSliderChange(1);
    expect((mockService.radarTime$ as BehaviorSubject<string | null>).getValue()).toBe(TIMES[1]);
  });

  it('should call pause() on destroy', () => {
    component.ngOnDestroy();
    expect(mockService.pause).toHaveBeenCalled();
  });
});
