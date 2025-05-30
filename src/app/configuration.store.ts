import { Injectable, signal } from '@angular/core';
import type { BombTimerOptions } from './types';

@Injectable({ providedIn: 'root' })
export class ConfigurationStore {
  private readonly _configuration = signal<BombTimerOptions | null>(null);

  readonly configuration = this._configuration.asReadonly();

  setConfiguration(config: BombTimerOptions) {
    this._configuration.set(config);
  }

  reset() {
    this._configuration.set(null);
  }
}
