import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller } from 'react-hook-form';

import { startOfDay } from 'date-fns';

import { findNextAvailableDate } from '../utils/findNextAvailableDate';
import { filterDate } from '../utils/helpers';
import { IFormValues } from './ScheduleForm';
import { MaxDate } from './SetMaxBookingDateForm';

interface CalendarPickerProps {
  name: keyof IFormValues;
  control: Control<IFormValues>;
  error?: string;
  maxDate?: MaxDate;
  blockedDates: string[];
}

export default function CalendarPicker({
  name,
  control,
  error,
  maxDate,
  blockedDates,
}: CalendarPickerProps) {
  const minDate = new Date();
  return (
    <div className="flex items-center justify-center">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedDate = findNextAvailableDate({
            date: startOfDay(value),
            blockedDates,
          });

          return (
            <DatePicker
              minDate={minDate}
              maxDate={maxDate?.date ? new Date(maxDate.date) : undefined}
              inline
              dateFormat="dd/MM/yyyy"
              showPopperArrow={false}
              onChange={onChange}
              onMonthChange={(date) => {
                const selectedDate = findNextAvailableDate({
                  date: startOfDay(date),
                  blockedDates,
                });
                onChange(selectedDate);
              }}
              selected={selectedDate}
              placeholderText="Select a date"
              filterDate={(date: Date) => !filterDate(date, blockedDates)}
            />
          );
        }}
      />
      <span className="my-1 text-error text-sm h-5">{error}</span>
    </div>
  );
}
