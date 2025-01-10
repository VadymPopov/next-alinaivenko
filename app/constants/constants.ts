const monthMap: { [key: string]: number } = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export const serviceOptions = [
  { value: 'Small Tattoo', label: 'Small Tattoo' },
  { value: 'Large Tattoo', label: 'Large Tattoo' },
  { value: 'Touch-up', label: 'Touch-up' },
  { value: 'Permanent Makeup', label: 'Permanent Makeup' },
];

export const monthOptions = Object.keys(monthMap).map((month) => ({
  value: String(monthMap[month]).padStart(2, '0'),
  label: month,
}));

export const apptTableHeaders = [
  'Client',
  'Email',
  'Instagram',
  'Service',
  'Date',
  'Slot',
  'Duration',
];

export const newApptTableHeaders = [
  'Client',
  'Email',
  'Deposit',
  'Service',
  'Date',
  'Slot',
];
