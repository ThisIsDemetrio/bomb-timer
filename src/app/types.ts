export enum BombTimerState {
  CONFIGURATION = 'CONFIGURATION',
  TIMER_RUNNING = 'TIMER_RUNNING',
  TIMER_EXPIRED = 'TIMER_EXPIRED',
}

export const BLUE = '#1f76ff';
export const GREEN = '#03AC13';
export const RED = '#FF0000';
export const BLACK = '#000000';

export type Color = typeof BLUE | typeof GREEN | typeof RED | typeof BLACK;

export type BombTimerOptions = {
  hours: string;
  minutes: string;
  showMilliseconds: boolean;
  color: Color;
};
