'use client';

import { IAppointment } from '@/app/components/AppointmentDetails';

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

import { format, parse } from 'date-fns';

import { apptTableHeaders } from '../constants/constants';
import { filterDate } from '../utils/helpers';
import AdminTitle from './AdminTitle';
import AppointmentsTable from './AppointmentsTable';
import { IBlockedSlot } from './WeekView';

const DayView = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<IBlockedSlot[]>([]);
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

  useEffect(() => {
    const fetchBlockedSlots = async () => {
      try {
        const response = await fetch(
          `/api/admin/calendar/blocked-slots?date=${format(selectedDate, 'yyyy-MM-dd')}`,
        );
        if (!response.ok) throw new Error('Failed to fetch blocked slots');
        const blockedSlots = await response.json();
        setBlockedSlots(blockedSlots);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error
            ? error.message
            : 'Error fetching blocked slots',
        );
      }
    };

    fetchBlockedSlots();
  }, [selectedDate]);

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

  const combinedApptSlots = [...blockedSlots, ...appointments].sort((a, b) => {
    const dateA = parse(a.slot, 'hh:mma', new Date());
    const dateB = parse(b.slot, 'hh:mma', new Date());
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="flex flex-col xl:flex-row mt-4 gap-5">
      <div className="schedule flex justify-center">
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
      <div className="w-full py-2.5 px-4 md:py-4 md:px-8 bg-mainLightColor rounded-3xl shadow-lg">
        <div className="border-b border-textColorDarkBg pb-5 mb-5">
          <AdminTitle title="Appointments" />
        </div>
        <AppointmentsTable
          appointments={appointments}
          headers={apptTableHeaders}
          combinedApptSlots={combinedApptSlots}
        />
      </div>
    </div>
  );
};

export default DayView;
