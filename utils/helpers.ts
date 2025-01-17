import { format, parse } from 'date-fns';

import { IDate } from '../app/admin/appointments/page';
import { IAppointment } from '../components/admin/AppointmentDetails';
import { IBlockedSlot } from '../components/admin/WeekView';
import { serviceType } from '../providers/BookingFormContext';

export const calculatePrice = (selectedProcedure: serviceType | null) => {
  let price;

  switch (selectedProcedure) {
    case 'Small Tattoo':
      price = 100;
      break;
    case 'Large Tattoo':
      price = 120;
      break;
    case 'Permanent Makeup':
      price = 100;
      break;
    case 'Touch-up':
      price = 20;
      break;
    default:
      price = 0;
  }

  return price;
};

export const pickDuration = (selectedProcedure: serviceType | null) => {
  let duration;

  switch (selectedProcedure) {
    case 'Small Tattoo':
      duration = 60;
      break;
    case 'Large Tattoo':
      duration = 120;
      break;
    case 'Permanent Makeup':
      duration = 60;
      break;
    case 'Touch-up':
      duration = 30;
      break;
    default:
      duration = 60;
  }

  return duration;
};

export const calculateTip = (amount: number, percentage: number) => {
  switch (percentage) {
    case 15:
      return Number((amount * 0.15).toFixed(2));
    case 20:
      return Number((amount * 0.2).toFixed(2));
    case 25:
      return Number((amount * 0.25).toFixed(2));
    case 30:
      return Number((amount * 0.3).toFixed(2));
    default:
      return 0;
  }
};

export const formatCurrency = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'CAD' });

export const calculateStripeFee = (amount: number) => {
  const percentageFee = 0.029;
  const flatFee = 0.3;

  const fee = amount * percentageFee + flatFee;
  return Number(fee.toFixed(2));
};

export const calculateTotals = (
  paymentAmount?: number,
  paymentFee?: number,
  tip?: number,
) => {
  const parsedPaymentAmount = parseFloat(paymentAmount?.toString() || '') || 0;
  const parsedPaymentFee = parseFloat(paymentFee?.toString() || '') || 0;
  const parsedTip = parseFloat(tip?.toString() || '') || 0;

  const tax = parsedPaymentAmount * 0.13;
  const total = parsedPaymentAmount + tax + parsedPaymentFee + parsedTip;

  return { tax: Number(tax.toFixed(2)), total: Number(total.toFixed(2)) };
};

export const getDepositBreakdown = (service: serviceType | null) => {
  const amount = calculatePrice(service) || 0;
  const tax = Number((amount * 0.13).toFixed(2)) || 0;
  const fee = calculateStripeFee(amount + tax);
  const total = Number((tax + amount + fee).toFixed(2));

  return {
    amount,
    tax,
    fee,
    total,
  };
};

export const getPaymentBreakdown = (amount: number, tip: number) => {
  const tax = Number((amount * 0.13).toFixed(2)) || 0;
  const fee = calculateStripeFee(amount + tax);
  const total = Number((tax + amount + fee + tip).toFixed(2));

  return {
    tax,
    fee,
    total,
  };
};

export const generateDays = (year?: number, month?: number) => {
  if (!year || !month) return [];
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: String(i + 1),
  }));
};

export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return hours > 0
    ? `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`
    : `${minutes}min`;
};

export const filterDate = (date: Date, blockedDates: string[]) => {
  return blockedDates?.find(
    (blockedDate) =>
      blockedDate.split('T')[0] === date.toISOString().split('T')[0],
  );
};

export const getFilterString = (date: IDate) => {
  if (date.year && date.month && date.day) {
    const fullDate = new Date(date.year, date.month - 1, date.day);
    return `Showing appointments for: ${format(fullDate, 'MMM dd, yyyy')}`;
  } else if (date.year && date.month) {
    const fullDate = new Date(date.year, date.month - 1, 1);
    return `Showing appointments for: ${format(fullDate, 'MMMM yyyy')}`;
  } else if (date.year) {
    return `Showing appointments for the year: ${date.year}`;
  } else {
    return 'Showing appointments by default date (Today)';
  }
};

export const getDateString = (date: IDate) => {
  if (date.year && date.month && date.day) {
    const fullDate = new Date(date.year, date.month - 1, date.day);
    return `${format(fullDate, 'MMM dd, yyyy')}`;
  } else if (date.year && date.month) {
    const fullDate = new Date(date.year, date.month - 1, 1);
    return `${format(fullDate, 'MMMM yyyy')}`;
  } else if (date.year) {
    return `${date.year}`;
  } else {
    return '';
  }
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getParsedDate = (dateStr: string) => {
  return parse(dateStr, 'yyyy-MM-dd', new Date());
};

export const arraysAreEqual = (arr1: Date[], arr2: Date[]) => {
  if (arr1.length !== arr2.length) return false;
  const sortedArr1 = arr1.map((date) => new Date(date).getTime()).sort();
  const sortedArr2 = arr2.map((date) => new Date(date).getTime()).sort();
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};

export const isNewDate = (date: Date, dates: Date[]) => {
  return !dates.some((oldDate) => oldDate.getTime() === date.getTime());
};

export const durationOptions = (length: number) =>
  Array.from({ length }, (_, i) => {
    const value = (i + 1) * 30;
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const label =
      hours > 0
        ? `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`
        : `${minutes}min`;

    return {
      value: value.toString(),
      label,
    };
  });

export const slotsOptions = (slots: string[]) => {
  return slots.map((slot: string) => ({
    value: slot,
    label: slot,
  }));
};

export const getCombinedApptSlots = (
  blockedSlots: IBlockedSlot[],
  appointments: IAppointment[],
) => {
  const slots = [...blockedSlots, ...appointments];
  return slots.sort((a, b) => {
    const dateA = parse(a.slot, 'hh:mma', new Date());
    const dateB = parse(b.slot, 'hh:mma', new Date());
    return dateA.getTime() - dateB.getTime();
  });
};

export const getTimeSlots = () => {
  const slots: string[] = [];
  for (let i = 0; i < 18; i++) {
    const hour = 11 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    const period = hour < 12 ? 'am' : 'pm';
    const formattedHour = hour > 12 ? hour - 12 : hour;
    slots.push(`${formattedHour}:${minute}${period}`);
  }
  return slots;
};
