import {
  Appointment,
  AppointmentEdited,
  BlockedSlot,
  serviceType,
} from '@/types';

export const mockedAppointments: Appointment[] = [
  {
    _id: 'testid-1',
    name: 'Test 1',
    email: 'test1@mail.com',
    service: 'Small Tattoo' as serviceType,
    phone: '',
    description: '',
    date: '2025-02-10',
    duration: 60,
    instagram: '@test1',
    slot: '5:00pm',
    deposit: {
      amount: 100,
      tax: 13,
      fee: 5,
      total: 118,
    },
  },
  {
    _id: 'testid-2',
    name: 'Test 2',
    email: 'test2@mail.com',
    service: 'Large Tattoo' as serviceType,
    phone: '123-456-7890',
    description: 'Some description',
    date: '2025-02-11',
    duration: 90,
    instagram: '@test2',
    slot: '2:00pm',
    deposit: {
      amount: 150,
      tax: 19.5,
      fee: 7.5,
      total: 177,
    },
  },
  {
    _id: 'testid-3',
    name: 'Test 3',
    email: 'test3@mail.com',
    service: 'Permanent Makeup' as serviceType,
    phone: '987-654-3210',
    description: 'Another description',
    date: '2025-02-12',
    duration: 30,
    instagram: '@test3',
    slot: '12:30pm',
    deposit: {
      amount: 50,
      tax: 6.5,
      fee: 2.5,
      total: 59,
    },
  },
];

export const mockedBlockedSlots: BlockedSlot[] = [
  {
    _id: 'blocked-1',
    date: '2025-02-10',
    slot: '11:00am',
    duration: 60,
    reason: 'Staff Meeting',
  },
  {
    _id: 'blocked-2',
    date: '2025-02-10',
    slot: '2:00pm',
    duration: 30,
    reason: 'Lunch Break',
  },
  {
    _id: 'blocked-3',
    date: '2025-02-11',
    slot: '12:00pm',
    duration: 90,
    reason: 'Training',
  },
  {
    _id: 'blocked-4',
    date: '2025-02-12',
    slot: '4:00pm',
    duration: 60,
    reason: 'Doctor Appointment',
  },
];

export const mockedAppointment = {
  _id: 'testid-1',
  name: 'Test',
  email: 'test@mail.com',
  service: 'Small Tattoo' as serviceType,
  phone: '',
  description: '',
  date: '2025-02-10',
  duration: 60,
  instagram: '',
  slot: '5:00pm',
  deposit: {
    amount: 100,
    tax: 13,
    fee: 5,
    total: 118,
  },
  payment: {
    amount: 50,
    tax: 6.5,
    fee: 1.75,
    tip: 10,
    total: 68.25,
  },
  paymentIntentId: 'test-intent-id-1',
};

export const mockedBlockedDates = [
  '2025-02-09T05:00:00.000Z',
  '2025-02-13T05:00:00.000Z',
  '2025-02-14T05:00:00.000Z',
];

export const serviceStyles = [
  {
    service: 'Small Tattoo',
    expectedClass: 'text-[#2D6A4F] bg-[#D8F3DC] hover:border-[#2D6A4F]',
  },
  {
    service: 'Large Tattoo',
    expectedClass: 'text-[#A4161A] bg-[#FFD6D9] hover:border-[#A4161A]',
  },
  {
    service: 'Touch-up',
    expectedClass: 'text-[#FF6700] bg-[#FFE5CC] hover:border-[#FF6700]',
  },
  {
    service: 'Permanent Makeup',
    expectedClass: 'text-[#0077B6] bg-[#D0EFFF] hover:border-[#0077B6]',
  },
];

export const mockedSlots = ['11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm'];

export const mockedWaiverFormData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  governmentId: '987654321',
  dob: '1990-01-01',
  address: '123 Main St',

  bodyPart: 'Arm',
  design: 'Floral Tattoo',
  service: 'Tattoo',
  appointmentDate: '2025-03-10T12:00:00.000Z',

  waveRelease: true,

  pain: true,
  infection: true,
  healing: true,
  outcome: true,

  refund: true,
  permanentChange: false,
  media: false,
  age: true,

  drugs: false,
  disease: false,
  medication: false,
  skin: false,
  recipientOrgan: false,
  pregnancy: false,

  agreement: true,
  lot: 'A1',
  clientSignature: 'John Doe Signature',
  parentalSignature: 'Jane Doe Signature',
  parentalConsent: true,
  parentalName: 'Jane Doe',
  parentGovernmentId: '123456789',
};

export const mockedAppointmentEdited: AppointmentEdited = {
  _id: '123',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  service: 'Tattoo',
  date: '2025-03-10',
  slot: '1:00pm',
  duration: '45',
  depositAmount: 50,
  depositTax: 5,
  depositFee: 3,
  depositTotal: 58,
  paymentAmount: 150,
  paymentFee: 10,
  paymentTax: 12,
  paymentTotal: 172,
  paymentIntentId: '',
  tip: 15,
  description: '',
  instagram: '',
  phone: '123-456-7890',
};

export const mockedStudio = {
  name: 'Mocked Tattoo Studio',
  address: '123 Main Street, Anytown, CA 91234',
  _id: 'studio123',
  city: 'Anytown',
  latitude: '34.0522',
  longitude: '-118.2437',
};
