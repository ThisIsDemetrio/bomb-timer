import { BombTimerOptions, RED } from './types';

export const MILLISECONDS_IN_HOUR = 3600000;
export const MILLISECONDS_IN_MINUTE = 60000;
export const MILLISECONDS_IN_SECOND = 1000;

export const getDefaultOptions = (): BombTimerOptions => ({
  hours: '00',
  minutes: '30',
  showMilliseconds: false,
  color: RED,
});

const addLeadingZeros = (number: number, digits = 2): string => {
  const stringifiedNumber = String(number);
  const zerosToAdd = Math.max(digits - stringifiedNumber.length, 0);
  return '0'.repeat(zerosToAdd) + stringifiedNumber;
};

export const getFormattedTimeLeft = (
  millisecondsLeft: number,
  options: { showMilliseconds?: boolean }
): string => {
  const { showMilliseconds } = options;
  if (millisecondsLeft < 0)
    return '00:00:00' + (showMilliseconds ? '.000' : '');

  const hours = Math.floor(millisecondsLeft / MILLISECONDS_IN_HOUR);
  const hoursStr = addLeadingZeros(hours);
  millisecondsLeft -= hours * MILLISECONDS_IN_HOUR;

  const minutes = Math.floor(millisecondsLeft / MILLISECONDS_IN_MINUTE);
  const minutesStr = addLeadingZeros(minutes);
  millisecondsLeft -= minutes * MILLISECONDS_IN_MINUTE;

  const seconds = Math.floor(millisecondsLeft / MILLISECONDS_IN_SECOND);
  const secondsStr = addLeadingZeros(seconds);
  millisecondsLeft -= seconds * MILLISECONDS_IN_SECOND;

  let result = `${hoursStr}:${minutesStr}:${secondsStr}`;
  if (showMilliseconds) {
    const millisecondsStr = addLeadingZeros(millisecondsLeft, 3);
    result += `.${millisecondsStr}`;
  }

  return result;
};
