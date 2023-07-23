export enum BombTimerState {
  CONFIGURATION = 'CONFIGURATION',
  TIMER_RUNNING = 'TIMER_RUNNING',
  TIMER_EXPIRED = 'TIMER_EXPIRED',
}

export const BLUE = '#0D52BD';
export const GREEN = '#03AC13';
export const RED = '#FF0000';
export const BLACK = '#000000';

export type Color = typeof BLUE | typeof GREEN | typeof RED | typeof BLACK;

export type BombTimerOptions = {
  endTime: Date;
  showMilliseconds: boolean;
  color: Color;
};
