import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

import { filterDate } from '../utils/helpers';
import { IFormValues } from './ScheduleForm';
import { MaxDate } from './SetMaxBookingDateForm';

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
  const [maxDate, setMaxDate] = useState<MaxDate>();
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = currentDate.toLocaleString('default', {
    month: 'long',
  });
  const currentYear = currentDate.toLocaleString('default', {
    year: 'numeric',
  });

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const response = await fetch(
          `/api/admin/calendar?month=${currentMonth}&year=${currentYear}`,
        );
        if (!response.ok) throw new Error('Failed to fetch blocked dates');
        const data = await response.json();
        const dates = data.blockedDates || [];
        setBlockedDates(dates);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error
            ? error.message
            : 'Error fetching blocked dates',
        );
      }
    };

    fetchBlockedDates();
  }, [currentMonth, currentYear]);

  useEffect(() => {
    const fetchMaxDate = async () => {
      try {
        const response = await fetch(`/api/admin/calendar/max-date`);
        if (!response.ok) throw new Error('Failed to fetch max date');
        const data = await response.json();
        setMaxDate(data);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : 'Error fetching date.',
        );
      }
    };

    fetchMaxDate();
  }, []);

  const minDate = new Date();
  return (
    <div className="flex items-center justify-center">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            minDate={minDate}
            maxDate={maxDate?.date}
            inline
            dateFormat="dd/MM/yyyy"
            showPopperArrow={false}
            selected={value as Date}
            onChange={onChange}
            placeholderText="Select a date"
            onMonthChange={(date: Date) => setCurrentDate(date)}
            filterDate={(date: Date) => !filterDate(date, blockedDates)}
          />
        )}
      />
      <span className="my-1 text-error text-sm h-5">{error}</span>
    </div>
  );
}
