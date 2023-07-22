import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BombTimerOptions, Color } from '../types';
import { FormsModule } from '@angular/forms';
import { MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE } from '../utils';

const MAX_HOURS_ALLOWED = 99;
const MAX_MINUTES_ALLOWED = 59;

@Component({
  selector: 'configuration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  @Output() onConfigurationSend = new EventEmitter<BombTimerOptions>();

  selectedHours: string = '00';
  selectedMinutes: string = '01';
  showMilliseconds: boolean = false;
  selectedColor: Color = '#FF0000';

  private safeParseToInt(value: string): number {
    value = value.replace(/[^0-9]/g, '');
    return parseInt(value);
  }

  onSelectedHoursChange(value: string): void {
    const numberOfHours: number = this.safeParseToInt(value);
    if (Number.isNaN(numberOfHours)) return;

    this.selectedHours = Math.min(numberOfHours, MAX_HOURS_ALLOWED).toString();
  }

  onSelectedHoursFocusOut(): void {
    if (this.selectedHours.length > 1) return;

    this.selectedHours = 0 + this.selectedHours;
  }

  onSelectedMinutesChange(value: string): void {
    const numberOfMinutes: number = this.safeParseToInt(value);
    if (Number.isNaN(numberOfMinutes)) return;

    this.selectedMinutes = Math.min(numberOfMinutes, MAX_MINUTES_ALLOWED).toString();
  }

  onSelectedMinutesFocusOut(): void {
    if (this.selectedMinutes.length > 1) return;

    this.selectedMinutes = 0 + this.selectedMinutes;
  }

  isConfigurationValid(): boolean {
    return !!this.selectedColor && (parseInt(this.selectedHours) > 0 || parseInt(this.selectedMinutes) > 0);
  }

  submitConfiguration(): void {
    const options: BombTimerOptions = {
      color: this.selectedColor,
      showMilliseconds: this.showMilliseconds,
      endTime: new Date(
        new Date().getTime() +
          parseInt(this.selectedHours) * MILLISECONDS_IN_HOUR +
          parseInt(this.selectedMinutes) * MILLISECONDS_IN_MINUTE
      ),
    };

    this.onConfigurationSend.emit(options);
  }
}
