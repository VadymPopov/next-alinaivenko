export interface ClientFormValues {
  phone?: string | null;
  instagram?: string;
  images?: File[] | null;
  description?: string;
  name: string;
  email: string;
}

export interface CustomTipFormValues {
  amount: number;
}

export interface PaymentFormValues {
  amount: number;
  name: string;
  email: string;
}

export interface ScheduleFormValues {
  date: Date;
  slot: string;
}
