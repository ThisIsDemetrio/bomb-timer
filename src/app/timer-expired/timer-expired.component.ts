import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  OnDestroy,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { BLACK, Color } from '../types';
import { MILLISECONDS_IN_SECOND } from '../utils';
import { ConfigurationStore } from '../configuration.store';

@Component({
  selector: 'timer-expired',
  templateUrl: './timer-expired.component.html',
  styleUrls: ['./timer-expired.component.scss'],
  standalone: true,
  imports: [],
})
export class TimerExpiredComponent
  implements OnDestroy, OnDestroy, AfterViewInit
{
  @HostBinding('style.background-color') backgroundColor: Color = BLACK;
  @HostBinding('style.color') color: Color = BLACK;
  @Output() moveToConfiguration = new EventEmitter<void>();
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;

  intervalSubscription: Subscription;

  showRestartText = false;
  showRestartTextTimeout: NodeJS.Timeout | null = null;

  private readonly configurationStore = inject(ConfigurationStore);
  bombTimerConfiguration = this.configurationStore.configuration();

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.showRestartText) {
      this.moveToConfiguration.emit();
      return;
    }
  }

  constructor() {
    this.intervalSubscription = interval(MILLISECONDS_IN_SECOND).subscribe(
      () => {
        if (!this.bombTimerConfiguration) return;

        // Switch colors
        this.color = this.backgroundColor;
        this.backgroundColor =
          this.color === BLACK ? this.bombTimerConfiguration.color : BLACK;
      }
    );

    this.showRestartTextTimeout = setTimeout(
      () => (this.showRestartText = true),
      MILLISECONDS_IN_SECOND * 3
    );
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
