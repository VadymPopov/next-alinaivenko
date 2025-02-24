import {
  mockedAppointmentEdited,
  mockedAppointments,
  mockedBlockedSlots,
  mockedWaiverFormData,
} from '@/__mocks__/mockData';
import { serviceType } from '@/types';
import {
  arraysAreEqual,
  calculatePrice,
  calculateStripeFee,
  calculateTip,
  calculateTotals,
  capitalizeFirstLetter,
  durationOptions,
  filterDate,
  formatCurrency,
  formatDuration,
  generateDays,
  getCombinedApptSlots,
  getDateString,
  getDepositBreakdown,
  getFilterString,
  getParsedDate,
  getPaymentBreakdown,
  getTimeSlots,
  isNewDate,
  mapToMongoAppointment,
  pickDuration,
  prepareFilteredValues,
  slotsOptions,
} from '@/utils/helpers';

describe('calculatePrice', () => {
  test.each([
    { procedure: 'Small Tattoo' as serviceType, expected: 100 },
    { procedure: 'Large Tattoo' as serviceType, expected: 120 },
    { procedure: 'Permanent Makeup' as serviceType, expected: 100 },
    { procedure: 'Touch-up' as serviceType, expected: 20 },
    { procedure: null, expected: 0 },
    { procedure: 'Nonexistent Procedure' as serviceType, expected: 0 },
  ])('returns price $expected for $procedure', ({ procedure, expected }) => {
    expect(calculatePrice(procedure)).toStrictEqual(expected);
  });
});

describe('pickDuration', () => {
  test.each([
    { procedure: 'Small Tattoo' as serviceType, expected: 60 },
    { procedure: 'Large Tattoo' as serviceType, expected: 120 },
    { procedure: 'Permanent Makeup' as serviceType, expected: 60 },
    { procedure: 'Touch-up' as serviceType, expected: 30 },
    { procedure: null, expected: 60 },
    { procedure: 'Nonexistent Procedure' as serviceType, expected: 60 },
  ])('returns duration $expected for $procedure', ({ procedure, expected }) => {
    expect(pickDuration(procedure)).toStrictEqual(expected);
  });
});

describe('calculateTip', () => {
  test.each([
    { percentage: 15, amount: 100, expected: 15 },
    { percentage: 20, amount: 100, expected: 20 },
    { percentage: 25, amount: 100, expected: 25 },
    { percentage: 30, amount: 100, expected: 30 },
    { percentage: 50, amount: 100, expected: 0 },
  ])(
    'returns tip $expected for $percentage % of $amount',
    ({ amount, percentage, expected }) => {
      expect(calculateTip(amount, percentage)).toStrictEqual(expected);
    },
  );
});

describe('formatCurrency', () => {
  test.each([
    { amount: 100, expected: 'CA$100.00' },
    { amount: 23.5, expected: 'CA$23.50' },
    { amount: 0, expected: 'CA$0.00' },
  ])('returns $expected string for $amount', ({ amount, expected }) => {
    expect(formatCurrency(amount)).toStrictEqual(expected);
  });
});

describe('calculateStripeFee', () => {
  test.each([
    { amount: 100, expected: 3.2 },
    { amount: 23.5, expected: 0.98 },
    { amount: 0, expected: 0.3 },
  ])('returns $expected fee for $amount', ({ amount, expected }) => {
    expect(calculateStripeFee(amount)).toStrictEqual(expected);
  });
});

describe('calculateTotals', () => {
  test.each([
    {
      description:
        'returns correct totals for $100 payment with $11 fee and $15 tip',
      paymentAmount: 100,
      paymentFee: 11,
      tip: 15,
      expected: { tax: 13, total: 139 },
    },
    {
      description: 'returns correct totals for $100 payment',
      paymentAmount: 100,
      expected: { tax: 13, total: 113 },
    },
    {
      description: 'returns correct totals for $11 fee',
      paymentFee: 11,
      expected: { tax: 0, total: 11 },
    },
    {
      description: 'returns correct totals for $20 tip',
      paymentFee: 20,
      expected: { tax: 0, total: 20 },
    },
  ])('$description ', ({ paymentAmount, paymentFee, tip, expected }) => {
    expect(calculateTotals(paymentAmount, paymentFee, tip)).toStrictEqual(
      expected,
    );
  });
});

describe('getDepositBreakdown', () => {
  test.each([
    {
      service: 'Small Tattoo' as serviceType,
      expected: { amount: 100, fee: 3.58, tax: 13, total: 116.58 },
    },
    {
      service: 'Large Tattoo' as serviceType,
      expected: { amount: 120, fee: 4.23, tax: 15.6, total: 139.83 },
    },
    {
      service: 'Permanent Makeup' as serviceType,
      expected: { amount: 100, fee: 3.58, tax: 13, total: 116.58 },
    },
    {
      service: 'Touch-up' as serviceType,
      expected: { amount: 20, fee: 0.96, tax: 2.6, total: 23.56 },
    },
  ])(
    'returns correct price breakdown for $service ',
    ({ service, expected }) => {
      expect(getDepositBreakdown(service)).toStrictEqual(expected);
    },
  );
});

describe('getPaymentBreakdown', () => {
  test.each([
    {
      description:
        'returns correct payment breakdown for $100 payment and $15 tip',
      amount: 100,
      tip: 15,
      expected: { tax: 13, fee: 3.58, total: 131.58 },
    },
    {
      description:
        'returns correct payment breakdown for $22.5 payment and $5 tip',
      amount: 22.5,
      tip: 5,
      expected: { tax: 2.93, fee: 1.04, total: 31.47 },
    },
    {
      description:
        'returns correct payment breakdown for $50 payment and $0 tip',
      amount: 50,
      tip: 0,
      expected: { tax: 6.5, fee: 1.94, total: 58.44 },
    },
  ])('$description ', ({ amount, tip, expected }) => {
    expect(getPaymentBreakdown(amount, tip)).toStrictEqual(expected);
  });
});

describe('generateDays', () => {
  test.each([
    {
      description: 'February 2025',
      year: 2025,
      month: 2,
      length: 28,
      expected: Array.from({ length: 28 }, (_, i) => ({
        value: String(i + 1).padStart(2, '0'),
        label: String(i + 1),
      })),
    },
    {
      description: 'March 2025',
      year: 2025,
      month: 3,
      length: 31,
      expected: Array.from({ length: 31 }, (_, i) => ({
        value: String(i + 1).padStart(2, '0'),
        label: String(i + 1),
      })),
    },
    {
      description: 'April 2026',
      year: 2026,
      month: 4,
      length: 30,
      expected: Array.from({ length: 30 }, (_, i) => ({
        value: String(i + 1).padStart(2, '0'),
        label: String(i + 1),
      })),
    },
  ])(
    'returns array with $length days in $description',
    ({ year, month, expected }) => {
      expect(generateDays(year, month)).toStrictEqual(expected);
    },
  );
});

describe('formatDuration', () => {
  test.each([
    { duration: 60, expected: '1h' },
    { duration: 90, expected: '1h 30min' },
    { duration: 30, expected: '30min' },
    { duration: 510, expected: '8h 30min' },
  ])('returns $duration in format $expected', ({ duration, expected }) => {
    expect(formatDuration(duration)).toStrictEqual(expected);
  });
});

describe('filterDate', () => {
  test.each([
    {
      description: 'returns date from blocked dates array if found',
      date: new Date(2025, 1, 13),
      blockedDates: ['2025-02-13', '2025-02-14'],
      expected: '2025-02-13',
    },
    {
      description:
        'returns undefined if date was not found in blocked dates array',
      date: new Date(2025, 1, 12),
      blockedDates: ['2025-02-13', '2025-02-14'],
      expected: undefined,
    },
  ])('$description', ({ date, blockedDates, expected }) => {
    expect(filterDate(date, blockedDates)).toStrictEqual(expected);
  });
});

describe('getFilterString', () => {
  test.each([
    {
      description: 'returns string for full date',
      date: { year: 2025, month: 1, day: 13 },
      expected: 'Showing appointments for: Jan 13, 2025',
    },
    {
      description: 'returns string for year and month',
      date: { year: 2025, month: 1 },
      expected: 'Showing appointments for: January 2025',
    },
    {
      description: 'returns string for year',
      date: { year: 2025 },
      expected: 'Showing appointments for the year: 2025',
    },
    {
      description: 'returns default string if no date provided',
      date: {},
      expected: 'Showing appointments by default date (Today)',
    },
  ])('$description', ({ date, expected }) => {
    expect(getFilterString(date)).toStrictEqual(expected);
  });
});

describe('getDateString', () => {
  test.each([
    {
      description: 'returns date string for full date',
      date: { year: 2025, month: 1, day: 13 },
      expected: 'Jan 13, 2025',
    },
    {
      description: 'returns date string for year and month',
      date: { year: 2025, month: 1 },
      expected: 'January 2025',
    },
    {
      description: 'returns string for year',
      date: { year: 2025 },
      expected: '2025',
    },
    {
      description: 'returns default empty string if no date provided',
      date: {},
      expected: '',
    },
  ])('$description', ({ date, expected }) => {
    expect(getDateString(date)).toStrictEqual(expected);
  });
});

describe('capitalizeFirstLetter', () => {
  test.each([
    {
      string: 'small tattoo',
      expected: 'Small tattoo',
    },
    {
      string: 'large',
      expected: 'Large',
    },
  ])(
    'returns formatted string with capital first letter',
    ({ string, expected }) => {
      expect(capitalizeFirstLetter(string)).toStrictEqual(expected);
    },
  );
});

describe('getParsedDate', () => {
  it('parses a valid yyyy-MM-dd string correctly', () => {
    const result = getParsedDate('2025-02-23');
    expect(result).toBeInstanceOf(Date);
    expect(result?.toISOString().slice(0, 10)).toBe('2025-02-23');
  });

  it('returns null for an invalid date string', () => {
    expect(getParsedDate('2025-02-30')).toBeNull();
  });

  it('returns null for an empty string', () => {
    expect(getParsedDate('')).toBeNull();
  });

  it('returns null for null input', () => {
    expect(getParsedDate(null as unknown as string)).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(getParsedDate(undefined as unknown as string)).toBeNull();
  });
});

describe('arraysAreEqual', () => {
  test.each([
    {
      description: 'returns true if arrays are equal',
      arr1: [
        new Date(2025, 2, 15),
        new Date(2025, 2, 16),
        new Date(2025, 2, 20),
        new Date(2025, 2, 21),
      ],
      arr2: [
        new Date(2025, 2, 15),
        new Date(2025, 2, 16),
        new Date(2025, 2, 20),
        new Date(2025, 2, 21),
      ],
      expected: true,
    },
    {
      description: 'returns false if arrays are not equal',
      arr1: [
        new Date(2025, 2, 15),
        new Date(2025, 2, 16),
        new Date(2025, 2, 20),
        new Date(2025, 2, 21),
      ],
      arr2: [
        new Date(2025, 2, 15),
        new Date(2025, 2, 16),
        new Date(2025, 2, 20),
        new Date(2025, 2, 22),
      ],
      expected: false,
    },
    {
      description: 'returns false for different lengths',
      arr1: [new Date(2025, 2, 15)],
      arr2: [new Date(2025, 2, 15), new Date(2025, 2, 16)],
      expected: false,
    },
    {
      description: 'returns true for equal arrays in different order',
      arr1: [new Date(2025, 2, 16), new Date(2025, 2, 15)],
      arr2: [new Date(2025, 2, 15), new Date(2025, 2, 16)],
      expected: true,
    },
    {
      description: 'returns true for two empty arrays',
      arr1: [],
      arr2: [],
      expected: true,
    },
    {
      description: 'returns false if either array is null',
      arr1: null as unknown as Date[],
      arr2: [new Date(2025, 2, 15)],
      expected: false,
    },
    {
      description: 'returns false if either array is undefined',
      arr1: undefined as unknown as Date[],
      arr2: [new Date(2025, 2, 15)],
      expected: false,
    },
  ])('$description', ({ arr1, arr2, expected }) => {
    expect(arraysAreEqual(arr1, arr2)).toStrictEqual(expected);
  });
});

describe('isNewDate', () => {
  test.each([
    {
      description: 'returns true if date is not in the array',
      date: new Date(2025, 2, 23),
      dates: [
        new Date(2025, 2, 15),
        new Date(2025, 2, 16),
        new Date(2025, 2, 20),
        new Date(2025, 2, 21),
      ],
      expected: true,
    },
    {
      description: 'returns false if date is not in the array',
      date: new Date(2025, 2, 21),
      dates: [
        new Date(2025, 2, 15),
        new Date(2025, 2, 16),
        new Date(2025, 2, 20),
        new Date(2025, 2, 21),
      ],
      expected: false,
    },
  ])('$description', ({ date, dates, expected }) => {
    expect(isNewDate(date, dates)).toStrictEqual(expected);
  });
});

describe('durationOptions', () => {
  it('generates options for length 4', () => {
    expect(durationOptions(4)).toStrictEqual([
      { value: '30', label: '30min' },
      { value: '60', label: '1h' },
      { value: '90', label: '1h 30min' },
      { value: '120', label: '2h' },
    ]);
  });

  it('generates options for length 1', () => {
    expect(durationOptions(1)).toStrictEqual([{ value: '30', label: '30min' }]);
  });

  it('generates options for length 0 (empty array)', () => {
    expect(durationOptions(0)).toStrictEqual([]);
  });

  it('generates options for a larger length (6)', () => {
    expect(durationOptions(6)).toStrictEqual([
      { value: '30', label: '30min' },
      { value: '60', label: '1h' },
      { value: '90', label: '1h 30min' },
      { value: '120', label: '2h' },
      { value: '150', label: '2h 30min' },
      { value: '180', label: '3h' },
    ]);
  });
});

describe('slotsOptions', () => {
  it('generates options for slots array', () => {
    expect(slotsOptions(['11:00am', '11:30am', '12:00pm'])).toStrictEqual([
      { value: '11:00am', label: '11:00am' },
      { value: '11:30am', label: '11:30am' },
      { value: '12:00pm', label: '12:00pm' },
    ]);
  });

  it('generates options for slots array with length 1', () => {
    expect(slotsOptions(['11:00am'])).toStrictEqual([
      { value: '11:00am', label: '11:00am' },
    ]);
  });

  it('generates options for length 0 (empty array)', () => {
    expect(slotsOptions([])).toStrictEqual([]);
  });

  it('generates options for a larger length (6)', () => {
    expect(
      slotsOptions([
        '11:00am',
        '11:30am',
        '12:00pm',
        '5:00pm',
        '6:00pm',
        '7:30pm',
      ]),
    ).toStrictEqual([
      { value: '11:00am', label: '11:00am' },
      { value: '11:30am', label: '11:30am' },
      { value: '12:00pm', label: '12:00pm' },
      { value: '5:00pm', label: '5:00pm' },
      { value: '6:00pm', label: '6:00pm' },
      { value: '7:30pm', label: '7:30pm' },
    ]);
  });
});

describe('getCombinedApptSlots', () => {
  it('combines and sorts blocked slots and appointments', () => {
    const result = getCombinedApptSlots(mockedBlockedSlots, mockedAppointments);

    expect(result).toStrictEqual([
      { ...mockedBlockedSlots[0] },
      { ...mockedBlockedSlots[2] },
      { ...mockedAppointments[2] },
      { ...mockedBlockedSlots[1] },
      { ...mockedAppointments[1] },
      { ...mockedBlockedSlots[3] },
      { ...mockedAppointments[0] },
    ]);
  });

  it('returns an empty array if both inputs are empty', () => {
    expect(getCombinedApptSlots([], [])).toStrictEqual([]);
  });
});

describe('getTimeSlots', () => {
  it('generates correct slots', () => {
    expect(getTimeSlots()).toStrictEqual([
      '11:00am',
      '11:30am',
      '12:00pm',
      '12:30pm',
      '1:00pm',
      '1:30pm',
      '2:00pm',
      '2:30pm',
      '3:00pm',
      '3:30pm',
      '4:00pm',
      '4:30pm',
      '5:00pm',
      '5:30pm',
      '6:00pm',
      '6:30pm',
      '7:00pm',
      '7:30pm',
    ]);
  });
});

describe('prepareFilteredValues', () => {
  it('returns filtered values when client is under 18', () => {
    const values = {
      ...mockedWaiverFormData,
      dob: '2010-01-01',
      isClientUnder18: true,
    };

    const result = prepareFilteredValues(values);

    expect(result).toEqual({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      governmentId: '987654321',
      dob: '2010-01-01',
      address: '123 Main St',
      bodyPart: 'Arm',
      design: 'Floral Tattoo',
      service: 'Tattoo',
      appointmentDate: '2025-03-10',
      isClientUnder18: true,
      parentalSignature: 'Jane Doe Signature',
      parentalName: 'Jane Doe',
      parentGovernmentId: '123456789',
      lot: 'A1',
    });
  });

  it('returns filtered values when client is not under 18', () => {
    const values = {
      ...mockedWaiverFormData,
      isClientUnder18: false,
    };

    const result = prepareFilteredValues(values);

    expect(result).toEqual({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      governmentId: '987654321',
      dob: '1990-01-01',
      address: '123 Main St',
      bodyPart: 'Arm',
      design: 'Floral Tattoo',
      service: 'Tattoo',
      appointmentDate: '2025-03-10',
      isClientUnder18: false,
      clientSignature: 'John Doe Signature',
      lot: 'A1',
    });
  });
});

describe('mapToMongoAppointment', () => {
  it('maps required fields correctly', () => {
    const result = mapToMongoAppointment({
      ...mockedAppointmentEdited,
      phone: '',
      duration: '60',
      paymentIntentId: 'payment-123',
      email: 'john.doe@example.com',
      name: 'John Doe',
    });

    expect(result).toEqual({
      _id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '',
      service: 'Tattoo',
      date: '2025-03-10',
      slot: '1:00pm',
      duration: 60,
      description: '',
      instagram: '',
      paymentIntentId: 'payment-123',
      deposit: {
        amount: 50,
        tax: 5,
        fee: 3,
        total: 58,
      },
      payment: {
        amount: 150,
        tip: 15,
        fee: 10,
        tax: 12,
        total: 172,
      },
    });
  });

  it('defaults empty values for optional fields', () => {
    const result = mapToMongoAppointment(mockedAppointmentEdited);

    expect(result).toEqual({
      _id: '123',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '123-456-7890',
      service: 'Tattoo',
      date: '2025-03-10',
      slot: '1:00pm',
      duration: 45,
      description: '',
      instagram: '',
      paymentIntentId: '',
      deposit: {
        amount: 50,
        tax: 5,
        fee: 3,
        total: 58,
      },
      payment: {
        amount: 150,
        tip: 15,
        fee: 10,
        tax: 12,
        total: 172,
      },
    });
  });
});
