export enum BombTimerState {
  CONFIGURATION = 'CONFIGURATION',
  TIMER_RUNNING = 'TIMER_RUNNING',
  TIMER_EXPIRED = 'TIMER_EXPIRED',
}

export type BLUE = '#0D52BD';
export type GREEN = '#03AC13';
export type RED = '#FF0000';
export type BLACK = '#000000';

export type Color = BLUE | GREEN | RED | BLACK;

export type BombTimerOptions = {
  endTime: Date;
  showMilliseconds: boolean;
  color: Color;
};
