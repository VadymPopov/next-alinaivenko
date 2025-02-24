import { mockedAppointment } from '@/__mocks__/mockData';
import { convertToDate } from '@/utils';

describe('convertToDate ', () => {
  test.each([
    {
      appointment: mockedAppointment,
      expected: new Date(2025, 1, 10, 17, 0),
      description: 'returns converted date',
    },
    {
      appointment: { ...mockedAppointment, slot: '12:00pm' },
      expected: new Date(2025, 1, 10, 12, 0),
      description: 'converts date with different time slot',
    },
    {
      appointment: { ...mockedAppointment, date: '2025-02-25' },
      expected: new Date(2025, 1, 25, 17, 0),
      description: 'converts different date',
    },
  ])('$description', ({ appointment, expected }) => {
    expect(convertToDate(appointment)).toStrictEqual(expected);
  });
});
