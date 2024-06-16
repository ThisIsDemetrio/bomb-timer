import { Component } from '@angular/core';
import { BombTimerOptions, BombTimerState } from './types';
import { BombTimerComponent } from './bomb-timer/bomb-timer.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import {
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_MINUTE,
  getDefaultOptions,
} from './utils';
import { TimerExpiredComponent } from './timer-expired/timer-expired.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [BombTimerComponent, ConfigurationComponent, TimerExpiredComponent],
})
export class AppComponent {
  // TODO: Add ngOnInit to retrieve from localStorage existing timers
  state: BombTimerState = BombTimerState.CONFIGURATION;

  currentConfiguration: BombTimerOptions = getDefaultOptions();
  endDate: Date = new Date();

  onMoveToConfiguration(): void {
    this.currentConfiguration = getDefaultOptions();
    this.state = BombTimerState.CONFIGURATION;
  }

  onCountdownCanceled(): void {
    this.endDate = new Date();
    this.state = BombTimerState.CONFIGURATION;
  }

  onConfigurationCompleted(options: BombTimerOptions): void {
    this.currentConfiguration = options;
    this.endDate = new Date(
      new Date().getTime() +
        parseInt(this.currentConfiguration.hours) * MILLISECONDS_IN_HOUR +
        parseInt(this.currentConfiguration.minutes) * MILLISECONDS_IN_MINUTE
    );
    this.state = BombTimerState.TIMER_RUNNING;
  }

  onCountdownCompleted(): void {
    this.state = BombTimerState.TIMER_EXPIRED;
  }
}
