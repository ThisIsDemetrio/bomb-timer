import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BLUE, BombTimerOptions, Color, GREEN, RED } from '../types';
import { FormsModule } from '@angular/forms';
import { getDefaultOptions } from '../utils';

const MAX_HOURS_ALLOWED = 99;
const MAX_MINUTES_ALLOWED = 59;

@Component({
  selector: 'configuration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  @Input() configuration: BombTimerOptions = getDefaultOptions()
  @Output() onConfigurationSend = new EventEmitter<BombTimerOptions>();

  currentOptions: BombTimerOptions = getDefaultOptions()

  availableColors = [
    { name: 'RED', value: RED },
    { name: 'GREEN', value: GREEN },
    { name: 'BLUE', value: BLUE },
  ];

  private safeParseToInt(value: string): number {
    value = value.replace(/[^0-9]/g, '');
    return parseInt(value);
  }

  onSelectedHoursChange(value: string): void {
    const numberOfHours: number = this.safeParseToInt(value);
    if (Number.isNaN(numberOfHours)) return;

    this.configuration.hours = Math.min(numberOfHours, MAX_HOURS_ALLOWED).toString();
  }

  onSelectedHoursFocusOut(): void {
    if (this.configuration.hours.length > 1) return;

    this.configuration.hours = 0 + this.configuration.hours;
  }

  onSelectedMinutesChange(value: string): void {
    const numberOfMinutes: number = this.safeParseToInt(value);
    if (Number.isNaN(numberOfMinutes)) return;

    this.configuration.minutes = Math.min(numberOfMinutes, MAX_MINUTES_ALLOWED).toString();
  }

  onSelectedMinutesFocusOut(): void {
    if (this.configuration.minutes.length > 1) return;

    this.configuration.minutes = 0 + this.configuration.minutes;
  }

  isConfigurationValid(): boolean {
    return !!this.configuration.color && (parseInt(this.configuration.hours) > 0 || parseInt(this.configuration.minutes) > 0);
  }

  submitConfiguration(): void {
    this.onConfigurationSend.emit({ ...this.configuration });
  }
}
