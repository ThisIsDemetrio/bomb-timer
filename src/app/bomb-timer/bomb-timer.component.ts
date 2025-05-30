import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';

import { BehaviorSubject, Subscription, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { BLACK, Color } from '../types';
import { MILLISECONDS_IN_SECOND, getFormattedTimeLeft } from '../utils';
import { ConfigurationStore } from '../configuration.store';

@Component({
  selector: 'bomb-timer',
  templateUrl: './bomb-timer.component.html',
  styleUrls: ['./bomb-timer.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class BombTimerComponent implements OnDestroy, OnInit, AfterViewInit {
  @Input() endDate: Date = new Date();
  @HostBinding('style.color') color: Color = BLACK;
  @Output() countdownCanceled = new EventEmitter<void>();
  @Output() countdownCompleted = new EventEmitter<void>();
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;

  private readonly configurationStore = inject(ConfigurationStore);
  get bombTimerConfiguration() {
    return this.configurationStore.configuration();
  }

  showCancelWarning = false;

  showCancelTimeout: NodeJS.Timeout | null = null;
  countdownInterval$: Subscription | null = null;
  timeLeftInMs$ = new BehaviorSubject<string>('');

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.showCancelTimeout) clearTimeout(this.showCancelTimeout);

    if (event.key === 'Escape' && this.showCancelWarning) {
      this.countdownCanceled.emit();
      return;
    }

    this.showCancelWarning = true;
    this.showCancelTimeout = setTimeout(
      () => (this.showCancelWarning = false),
      MILLISECONDS_IN_SECOND
    );
  }

  ngOnInit(): void {
    const config = this.bombTimerConfiguration;
    if (!config) throw new Error('BombTimerOptions not set in store');
    const { showMilliseconds } = config;

    this.countdownInterval$ = interval(61)
      .pipe(takeWhile(() => this.endDate.getTime() > new Date().getTime()))
      .subscribe({
        next: () => {
          const timeLeft = this.endDate.getTime() - new Date().getTime();
          this.timeLeftInMs$.next(
            getFormattedTimeLeft(timeLeft, { showMilliseconds })
          );
        },
        error: (error: unknown) => {
          console.error((error as Error).message);
          this.countdownCanceled.emit();
        },
        complete: () => {
          this.timeLeftInMs$.complete();
          this.countdownCompleted.emit();
        },
      });
  }

  ngAfterViewInit(): void {
    const config = this.bombTimerConfiguration;
    if (!config) throw new Error('BombTimerOptions not set in store');
    this.color = config.color;
    this.audioPlayerRef.nativeElement.play();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval$) this.countdownInterval$.unsubscribe();

    this.audioPlayerRef.nativeElement.pause();
  }
}
