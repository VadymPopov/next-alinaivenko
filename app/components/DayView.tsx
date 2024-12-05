'use client';

import { IAppointment } from '@/app/components/AppointmentDetails';

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

import { filterDate } from '../utils/helpers';
import AppointmentsTable from './AppointmentsTable';

const DayView = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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

  const onDateChange = async (date: Date) => {
    setSelectedDate(date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    try {
      const queryParams = new URLSearchParams();

      if (day) queryParams.append('day', day.toString());
      if (month) queryParams.append('month', month);
      if (year) queryParams.append('year', year);

      const query = queryParams.toString();
      const response = await fetch(`/api/appointments?${query}`);
      const appointments = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setAppointments(appointments);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  return (
    <div>
      <div className="w-full max-w-7xl mx-auto mt-4 schedule">
        <DatePicker
          inline
          dateFormat="dd/MM/yyyy"
          showPopperArrow={false}
          selected={selectedDate}
          onChange={(date) => onDateChange(date as Date)}
          placeholderText="Select a date"
          onMonthChange={(date: Date) => setCurrentDate(date)}
          filterDate={(date: Date) => !filterDate(date, blockedDates)}
        />
      </div>
      <div className="py-8 px-10 bg-mainLightColor rounded-3xl mb-10 shadow-lg">
        <div className="flex justify-between border-b border-textColorDarkBg pb-5 mb-3">
          <h2 className="text-accentColor font-semibold text-2xl">
            Appointments
          </h2>
        </div>
        <AppointmentsTable appointments={appointments} />
      </div>
    </div>
  );
};

export default DayView;
