import { findNextAvailableDate } from '@/utils';

describe('findNextAvailableDate', () => {
  test.each([
    {
      date: new Date(2025, 1, 13),
      blockedDates: ['2025-02-13', '2025-02-14'],
      expected: new Date(2025, 1, 15),
      description: 'returns first available date if date is blocked',
    },
    {
      date: new Date(2025, 1, 15),
      blockedDates: [],
      expected: new Date(2025, 1, 15),
      description: 'returns the same date if no dates are blocked',
    },
    {
      date: new Date(2025, 1, 10),
      blockedDates: [
        '2025-02-10',
        '2025-02-11',
        '2025-02-12',
        '2025-02-13',
        '2025-02-14',
        '2025-02-15',
        '2025-02-16',
      ],
      expected: new Date(2025, 1, 17),
      description:
        'skips multiple blocked dates and finds the next available date',
    },
  ])('$description', ({ date, blockedDates, expected }) => {
    expect(
      findNextAvailableDate({
        date,
        blockedDates,
      }),
    ).toStrictEqual(expected);
  });
});
