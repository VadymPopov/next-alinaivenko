export interface Options {
  label: string;
  value: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface MaxDate {
  _id?: string;
  date: Date;
}

export interface AppointmentType {
  date: string;
  slot: string;
  duration: number;
}
