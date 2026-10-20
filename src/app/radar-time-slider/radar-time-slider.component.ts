import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LayersService } from '../services/layers.service';

@Component({
  selector: 'app-radar-time-slider',
  templateUrl: './radar-time-slider.component.html',
  styleUrls: ['./radar-time-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RadarTimeSliderComponent implements OnInit, OnDestroy {
  times: string[] = [];
  selectedIndex = 0;

  readonly speedOptions = [
    { label: '0.25×', value: 4000 },
    { label: '0.5×', value: 2000 },
    { label: '1×', value: 1000 },
    { label: '2×', value: 500 },
  ];

  private subscriptions = new Subscription();

  constructor(
    public layersService: LayersService,
    private cdr: ChangeDetectorRef
  ) {}

  get isVisible(): boolean {
    return this.layersService.radarLayer?.getVisible() ?? false;
  }

  get selectedTime(): string | null {
    return this.times.length > 0 ? this.times[this.selectedIndex] : null;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.layersService.radarTimes$.subscribe(times => {
        this.times = times;
        this.selectedIndex = times.length > 0 ? times.length - 1 : 0;
        this.cdr.markForCheck();
      })
    );

    this.subscriptions.add(
      this.layersService.radarTime$.subscribe(time => {
        if (time && this.times.length > 0) {
          const idx = this.times.indexOf(time);
          if (idx >= 0) {
            this.selectedIndex = idx;
            this.cdr.markForCheck();
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.layersService.pause();
    this.subscriptions.unsubscribe();
  }

  onSliderChange(value: number | null): void {
    if (value === null || this.times.length === 0) return;
    this.selectedIndex = value;
    this.layersService.radarTime$.next(this.times[value]);
  }

  togglePlayPause(): void {
    if (this.layersService.isPlaying) {
      this.layersService.pause();
    } else {
      this.layersService.play();
    }
    this.cdr.markForCheck();
  }

  stepBack(): void {
    this.layersService.stepBy(-1);
  }

  stepForward(): void {
    this.layersService.stepBy(1);
  }

  onSpeedChange(intervalMs: number): void {
    const wasPlaying = this.layersService.isPlaying;
    if (wasPlaying) this.layersService.pause();
    this.layersService.frameIntervalMs = intervalMs;
    if (wasPlaying) this.layersService.play();
  }
}
