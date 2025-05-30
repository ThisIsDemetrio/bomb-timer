import {
  getDefaultOptions,
  getFormattedTimeLeft,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND,
} from './utils';
import { RED } from './types';

describe('utils', () => {
  describe('getDefaultOptions', () => {
    it('should return default options', () => {
      const options = getDefaultOptions();
      expect(options).toEqual({
        hours: '00',
        minutes: '30',
        showMilliseconds: false,
        color: RED,
      });
    });
  });

  describe('getFormattedTimeLeft', () => {
    it('should format time left as HH:MM:SS', () => {
      const ms =
        1 * MILLISECONDS_IN_HOUR +
        2 * MILLISECONDS_IN_MINUTE +
        3 * MILLISECONDS_IN_SECOND;
      expect(getFormattedTimeLeft(ms, { showMilliseconds: false })).toBe(
        '01:02:03'
      );
    });

    it('should format time left as HH:MM:SS.mmm when showMilliseconds is true', () => {
      const ms =
        1 * MILLISECONDS_IN_HOUR +
        2 * MILLISECONDS_IN_MINUTE +
        3 * MILLISECONDS_IN_SECOND +
        456;
      expect(getFormattedTimeLeft(ms, { showMilliseconds: true })).toBe(
        '01:02:03.456'
      );
    });

    it('should return 00:00:00 when negative milliseconds', () => {
      expect(getFormattedTimeLeft(-100, { showMilliseconds: false })).toBe(
        '00:00:00'
      );
    });

    it('should return 00:00:00.000 when negative milliseconds and showMilliseconds is true', () => {
      expect(getFormattedTimeLeft(-100, { showMilliseconds: true })).toBe(
        '00:00:00.000'
      );
    });

    it('should pad single digit numbers with zeros', () => {
      const ms =
        9 * MILLISECONDS_IN_SECOND +
        8 * MILLISECONDS_IN_MINUTE +
        7 * MILLISECONDS_IN_HOUR;
      expect(getFormattedTimeLeft(ms, { showMilliseconds: false })).toBe(
        '07:08:09'
      );
    });
  });
});
