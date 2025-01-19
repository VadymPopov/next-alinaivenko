'use client';

import { AdminTitle, AppointmentsTable } from '@/components/admin';
import { APPT_TABLE_HEADERS } from '@/constants';
import { useAppointments, useBlockedDates, useBlockedSlots } from '@/hooks';
import { filterDate, getCombinedApptSlots } from '@/utils/helpers';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { format } from 'date-fns';

export function DayView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const date = format(selectedDate, 'yyyy-MM-dd');

  const { slots: blockedSlots = [] } = useBlockedSlots({ date });
  const { dates: blockedDates = [] } = useBlockedDates(currentDate);
  const { appointments = [] } = useAppointments({ date });

  const onDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const combinedApptSlots = getCombinedApptSlots(blockedSlots, appointments);

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
          headers={APPT_TABLE_HEADERS}
          combinedApptSlots={combinedApptSlots}
        />
      </div>
    </div>
  );
}
