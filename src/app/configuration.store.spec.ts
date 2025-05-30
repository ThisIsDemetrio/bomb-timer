import { ConfigurationStore } from './configuration.store';
import { BombTimerOptions, RED } from './types';

describe('ConfigurationStore', () => {
  let store: ConfigurationStore;

  beforeEach(() => {
    store = new ConfigurationStore();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should have null configuration by default', () => {
    expect(store.configuration()).toBeNull();
  });

  it('should set configuration', () => {
    const config: BombTimerOptions = {
      hours: '01',
      minutes: '10',
      color: RED,
      showMilliseconds: true,
    };
    store.setConfiguration(config);
    expect(store.configuration()).toEqual(config);
  });

  it('should reset configuration to null', () => {
    const config: BombTimerOptions = {
      hours: '01',
      minutes: '10',
      color: RED,
      showMilliseconds: true,
    };
    store.setConfiguration(config);
    store.reset();
    expect(store.configuration()).toBeNull();
  });
});
