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

import { BombTimerOptions, Color } from '../types';
import { MILLISECONDS_IN_SECOND, getDefaultOptions } from '../utils';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'timer-expired',
  templateUrl: './timer-expired.component.html',
  styleUrls: ['./timer-expired.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TimerExpiredComponent implements OnDestroy, OnDestroy, AfterViewInit {
  @Input() bombTimerOptions: BombTimerOptions | undefined;
  @HostBinding('style.background-color') backgroundColor: Color = '#000000';
  @HostBinding('style.color') color: Color = '#000000';
  @Output() onStartNewTimer = new EventEmitter<void>();
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;

  intervalSubscription: Subscription;

  showRestartText: boolean = false;
  showRestartTextTimeout: NodeJS.Timeout | null = null;

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.showRestartText) {
      this.onStartNewTimer.emit();
      return;
    }
  }

  constructor() {
    this.intervalSubscription = interval(MILLISECONDS_IN_SECOND).subscribe(() => {
      if (!this.bombTimerOptions) return;

      this.color = this.backgroundColor;
      this.backgroundColor = this.color === '#000000' ? this.bombTimerOptions.color : '#000000';
    });

    this.showRestartTextTimeout = setTimeout(() => (this.showRestartText = false), MILLISECONDS_IN_SECOND * 3);
  }

  ngAfterViewInit(): void {
    this.audioPlayerRef.nativeElement.play();
  }

  ngOnDestroy(): void {
    if (this.showRestartTextTimeout) {
      clearTimeout(this.showRestartTextTimeout);
    }
  }
}
