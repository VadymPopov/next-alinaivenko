import { serviceType } from '@/providers/AppContext';

export interface AddApptFormValues {
  phone?: string | null;
  instagram?: string;
  description?: string;
  name: string;
  email: string;
  date: Date;
  service: string;
  slot: string;
  duration: string;
}

export interface BlockSlotFormValues {
  date: Date;
  slot: string;
  duration: string;
  reason?: string;
}

export interface EditApptFormValues {
  phone?: string | null;
  instagram?: string;
  description?: string;
  name: string;
  email: string;
  date: Date;
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
}

export interface ProfileFormValues {
  password: string;
  confirmPassword: string;
}

export interface SetMaxDateFormValues {
  date: Date;
}

export interface StudioFormValues {
  address: string;
  city: string;
  name: string;
  latitude: string;
  longitude: string;
}

export interface SignInFormValues {
  email: string;
  password: string;
}
