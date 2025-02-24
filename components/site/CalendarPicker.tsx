'use client';

import { MaxDate } from '@/types';
import { findNextAvailableDate } from '@/utils';
import { filterDate } from '@/utils/helpers';

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { startOfDay } from 'date-fns';

interface CalendarPickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: string;
  maxDate?: MaxDate;
  blockedDates: string[];
}

export function CalendarPicker<T extends FieldValues>({
  name,
  control,
  error,
  maxDate,
  blockedDates,
}: CalendarPickerProps<T>) {
  const minDate = new Date();

  return (
    <div className="flex items-center justify-center">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedDate = findNextAvailableDate({
            date: startOfDay(value || new Date()),
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

                if (!selectedDate) return;
                const maxDateValue = maxDate?.date
                  ? new Date(maxDate.date)
                  : null;
                const minDateValue = new Date(minDate);

                if (
                  maxDateValue &&
                  selectedDate.getTime() > maxDateValue.getTime()
                ) {
                  onChange(maxDateValue);
                } else if (selectedDate.getTime() < minDateValue.getTime()) {
                  onChange(minDateValue);
                } else {
                  onChange(selectedDate);
                }
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
