import { Dispatch, SetStateAction } from 'react';

export type serviceType =
  | 'Small Tattoo'
  | 'Large Tattoo'
  | 'Permanent Makeup'
  | 'Touch-up';

export interface AppointmentInfo {
  name?: string;
  email?: string;
  phone?: string | null;
  images?: string[] | null;
  description?: string;
  instagram?: string;
  address?: string;
  date?: Date;
  slot?: string;
  duration?: number;
  amount?: number;
  tax?: number;
  fee?: number;
  total?: number;
}

export interface PaymentInfo {
  name?: string;
  email?: string;
  amount?: number;
  tip?: number;
  tax?: number;
  fee?: number;
  total?: number;
}

export interface AppContext {
  service: serviceType | null;
  setService: Dispatch<SetStateAction<serviceType | null>>;
  appointmentInfo: AppointmentInfo | null;
  setAppointmentInfo: Dispatch<SetStateAction<AppointmentInfo | null>>;
  paymentInfo: PaymentInfo | null;
  setPaymentInfo: Dispatch<SetStateAction<PaymentInfo | null>>;
}
