import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller } from 'react-hook-form';

import { isNotMonTueWed } from '../utils/isNotMonTueWed';
import { IFormValues } from './ScheduleForm';

interface CalendarPickerProps {
  name: keyof IFormValues;
  control: Control<IFormValues>;
  error?: string;
}

export default function CalendarPicker({
  name,
  control,
  error,
}: CalendarPickerProps) {
  const minDate = new Date();
  const maxDate = new Date(2024, 10, 20);
  return (
    <div className="flex items-center justify-center">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            minDate={minDate}
            maxDate={maxDate}
            inline
            dateFormat="dd/MM/yyyy"
            showPopperArrow={false}
            selected={value as Date}
            onChange={onChange}
            placeholderText="Select a date"
            filterDate={isNotMonTueWed}
          />
        )}
      />
      <span className="my-1 text-error text-sm h-5">{error}</span>
    </div>
  );
}
