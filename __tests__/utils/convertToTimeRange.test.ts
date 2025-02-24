import { convertToTimeRange } from '@/utils';

describe('convertToTimeRange', () => {
  test.each([
    { time: '11:00am', duration: 60, expected: '11:00 - 12:00' },
    { time: '2:00am', duration: 30, expected: '02:00 - 02:30' },
    { time: '12:00am', duration: 30, expected: '00:00 - 00:30' },
    { time: '12:00pm', duration: 45, expected: '12:00 - 12:45' },
    { time: '11:45pm', duration: 30, expected: '23:45 - 00:15' },
  ])(
    'should convert $time with duration $duration to $expected',
    ({ time, duration, expected }) => {
      expect(convertToTimeRange(time, duration)).toStrictEqual(expected);
    },
  );
});
