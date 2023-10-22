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
} from '@angular/core';

import { BehaviorSubject, Subscription, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { BLACK, BombTimerOptions, Color } from '../types';
import { MILLISECONDS_IN_SECOND, getFormattedTimeLeft } from '../utils';

@Component({
  selector: 'bomb-timer',
  templateUrl: './bomb-timer.component.html',
  styleUrls: ['./bomb-timer.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class BombTimerComponent implements OnDestroy, OnInit, AfterViewInit {
  @Input() endDate: Date = new Date();
  @Input() bombTimerConfiguration: BombTimerOptions | undefined;
  @HostBinding('style.color') color: Color = BLACK;
  @Output() countdownCanceled = new EventEmitter<void>();
  @Output() countdownCompleted = new EventEmitter<void>();
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;

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
    if (!this.bombTimerConfiguration)
      throw new Error('BombTimerOptions not passed correctly');

    const { showMilliseconds } = this.bombTimerConfiguration;

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
    if (!this.bombTimerConfiguration)
      throw new Error('BombTimerOptions not passed correctly');

    this.color = this.bombTimerConfiguration.color;

    this.audioPlayerRef.nativeElement.play();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval$) this.countdownInterval$.unsubscribe();

    this.audioPlayerRef.nativeElement.pause();
  }
}
