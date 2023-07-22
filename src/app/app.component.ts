import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component } from '@angular/core';
import { BombTimerOptions, BombTimerState } from './types';
import { BombTimerComponent } from './bomb-timer/bomb-timer.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { getDefaultOptions } from './utils';
import { TimerExpiredComponent } from './timer-expired/timer-expired.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, BombTimerComponent, ConfigurationComponent, TimerExpiredComponent],
})
export class AppComponent {
  // TODO: Add ngOnInit to retrieve from localStorage existing timers
  state: BombTimerState = BombTimerState.CONFIGURATION;

  currentOptions: BombTimerOptions = getDefaultOptions();

  onMoveToConfiguration(): void {
    this.currentOptions = getDefaultOptions();
    this.state = BombTimerState.CONFIGURATION;
  }

  onConfigurationCompleted(options: BombTimerOptions): void {
    this.currentOptions = options;
    this.state = BombTimerState.TIMER_RUNNING;
  }

  onCountdownCompleted(): void {
    this.state = BombTimerState.TIMER_EXPIRED;
    console.log('countdown completed');
  }
}
