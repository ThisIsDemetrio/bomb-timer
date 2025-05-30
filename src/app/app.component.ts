import { Component, inject } from '@angular/core';
import { BombTimerOptions, BombTimerState } from './types';
import { BombTimerComponent } from './bomb-timer/bomb-timer.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE } from './utils';
import { TimerExpiredComponent } from './timer-expired/timer-expired.component';
import { ConfigurationStore } from './configuration.store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [BombTimerComponent, ConfigurationComponent, TimerExpiredComponent]
})
export class AppComponent {
  // TODO: Add ngOnInit to retrieve from localStorage existing timers
  state: BombTimerState = BombTimerState.CONFIGURATION;

  private readonly configurationStore = inject(ConfigurationStore);
  endDate: Date = new Date();

  onMoveToConfiguration(): void {
    this.configurationStore.reset();
    this.state = BombTimerState.CONFIGURATION;
  }

  onCountdownCanceled(): void {
    this.endDate = new Date();
    this.state = BombTimerState.CONFIGURATION;
  }

  onConfigurationCompleted(options: BombTimerOptions): void {
    this.endDate = new Date(
      new Date().getTime() +
        parseInt(options.hours) * MILLISECONDS_IN_HOUR +
        parseInt(options.minutes) * MILLISECONDS_IN_MINUTE
    );

    this.configurationStore.setConfiguration(options);
    this.state = BombTimerState.TIMER_RUNNING;
  }

  onCountdownCompleted(): void {
    this.state = BombTimerState.TIMER_EXPIRED;
  }
}
