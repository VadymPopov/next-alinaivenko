import { serviceType } from '@/providers/AppContext';

export interface SearchDate {
  year?: number;
  month?: number;
  day?: number;
}

export interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: 'Small Tattoo' | 'Large Tattoo' | 'Touch-up' | 'Permanent Makeup';
  date: string;
  slot: string;
  duration: number;
  description: string;
  instagram: string;
  deposit: {
    amount: number;
    tax: number;
    fee: number;
    total: number;
  };
  payment?: {
    amount: number;
    tax: number;
    fee: number;
    tip: number;
    total: number;
  };
  paymentIntentId?: string;
}

export interface AppointmentEdited {
  _id: string;
  phone?: string | null;
  instagram?: string;
  description?: string;
  name: string;
  email: string;
  date: string;
  service: serviceType;
  slot: string;
  duration: string;
  depositAmount?: number;
  depositTax?: number;
  depositFee?: number;
  depositTotal?: number;
  paymentAmount?: number;
  paymentTax?: number;
  paymentTotal?: number;
  paymentFee?: number;
  tip?: number;
  paymentIntentId?: string;
}

export interface NewAppointment extends Omit<Appointment, '_id'> {}
