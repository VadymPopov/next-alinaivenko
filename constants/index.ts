import { MdDashboard, MdOutlineEditCalendar, MdWork } from 'react-icons/md';

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

export const SERVICE_OPTIONS = [
  { value: 'Small Tattoo', label: 'Small Tattoo' },
  { value: 'Large Tattoo', label: 'Large Tattoo' },
  { value: 'Touch-up', label: 'Touch-up' },
  { value: 'Permanent Makeup', label: 'Permanent Makeup' },
];

export const MONTH_OPTIONS = Object.keys(monthMap).map((month) => ({
  value: String(monthMap[month]).padStart(2, '0'),
  label: month,
}));

export const APPT_TABLE_HEADERS = [
  'Client',
  'Email',
  'Instagram',
  'Service',
  'Date',
  'Slot',
  'Duration',
];

export const NEW_APPT_TABLE_HEADERS = [
  'Client',
  'Email',
  'Deposit',
  'Service',
  'Date',
  'Slot',
];

export const SIDEBAR_MENU = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: MdDashboard },
  { path: '/admin/appointments', label: 'Appointments', icon: MdWork },
  { path: '/admin/calendar', label: 'Calendar', icon: MdOutlineEditCalendar },
];

export const SERVICE_TYPES = [
  'Small Tattoo',
  'Large Tattoo',
  'Permanent Makeup',
  'Touch-up',
];

export const BOOKING_LINKS = [
  { label: 'Service', href: '/booking' },
  { label: 'Client', href: '/booking/client-info' },
  { label: 'Time', href: '/booking/schedule' },
  { label: 'Payment', href: '/booking/payment' },
];

export const SERVICES = [
  {
    title: 'Small Tattoo',
    duration: '60 min',
    deposit: 'CA$100',
  },
  {
    title: 'Large Tattoo',
    duration: '120 min',
    deposit: 'CA$120',
  },
  {
    title: 'Permanent Makeup',
    duration: '60 min',
    deposit: 'CA$100',
  },
  {
    title: 'Touch-up',
    duration: '30 min',
    deposit: 'CA$20',
  },
];

export const SITE_MENU = [
  {
    path: '/portfolio',
    label: 'Portfolio',
  },
  {
    path: '/services',
    label: 'Services and Prices',
  },
  {
    path: '/aftercare',
    label: 'Aftercare',
  },
  {
    path: '/waiverform',
    label: 'Waiver',
  },
  {
    path: '/booking',
    label: 'Booking',
  },
  {
    path: '/faq',
    label: 'FAQ',
  },
  {
    path: '/contact',
    label: 'Contact',
  },
  {
    path: '/payment',
    label: 'Payment',
  },
];

export const ADMIN_MENU = [
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
  },
  {
    path: '/admin/appointments',
    label: 'Appointments',
  },
  {
    path: '/admin/calendar',
    label: 'Calendar',
  },
];

export const SLOT_TIMES = [
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
];

export const PAYMENT_LINKS = [
  { label: 'Client', href: '/payment' },
  { label: 'Tip', href: '/payment/tip-amount' },
  { label: 'Payment', href: '/payment/confirmation' },
];
