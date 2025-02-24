import { isTimeWithinLastHour } from '@/utils';

describe('isTimeWithinLastHour', () => {
  const mockToday = new Date(2025, 1, 10, 14, 0);

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(mockToday);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test.each([
    { slot: '3:00pm', expected: false },
    { slot: '1:00pm', expected: true },
    { slot: '2:00pm', expected: true },
  ])('returns $expected for time slot $slot', ({ slot, expected }) => {
    const selectedDate = new Date(2025, 1, 10);
    expect(isTimeWithinLastHour(new Date(selectedDate), slot)).toBe(expected);
  });
});
