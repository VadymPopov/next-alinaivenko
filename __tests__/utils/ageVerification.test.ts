import { isClientUnderage } from '@/utils';

describe('isClientUnderage', () => {
  const mockToday = new Date(2025, 1, 1);

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(mockToday);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test.each([
    {
      birthdate: new Date(2005, 1, 1),
      expected: false,
      description: 'over 18',
    },
    {
      birthdate: new Date(2010, 1, 1),
      expected: true,
      description: 'under 18',
    },
    {
      birthdate: new Date(2007, 1, 1),
      expected: false,
      description: 'exactly 18',
    },
  ])(
    'should return $expected if client is $description',
    ({ birthdate, expected }) => {
      expect(isClientUnderage(birthdate)).toBe(expected);
    },
  );

  test.each([
    { birthdate: null as unknown as Date, error: 'Birthdate is required.' },
    {
      birthdate: undefined as unknown as Date,
      error: 'Birthdate is required.',
    },
    { birthdate: new Date(2030, 1, 1), error: 'Invalid birthdate.' },
  ])(
    'should throw an error "$error" for invalid birthdate',
    ({ birthdate, error }) => {
      expect(() => isClientUnderage(birthdate)).toThrow(error);
    },
  );
});
