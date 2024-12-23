'use client';

import AdminTitle from '@/app/components/AdminTitle';
import { IAppointment } from '@/app/components/AppointmentDetails';
import AppointmentsSearchForm from '@/app/components/AppointmentsSearchForm';
import AppointmentsTable from '@/app/components/AppointmentsTable';
import Flyout from '@/app/components/Flyout';
import SearchBar from '@/app/components/SearchBar';
import { getFilterString } from '@/app/utils/helpers';

import React, { useEffect, useMemo, useState } from 'react';

import { format } from 'date-fns';

export interface IDate {
  year?: number;
  month?: number;
  day?: number;
}

const defaultDate = {
  day: new Date().getDate(),
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

export default function Appointments() {
  const [date, setDate] = useState<IDate>(defaultDate);
  const [query, setQuery] = useState<string>('');
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `/api/appointments?date=${format(new Date(), 'yyyy-MM-dd')}`,
        {
          cache: 'no-store',
        },
      );
      const appointments = await response.json();
      setAppointments(appointments);
    })();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.name.toLowerCase().includes(query.toLowerCase()) ||
        appointment.email.toLowerCase().includes(query.toLowerCase()),
    );
  }, [appointments, query]);

  const handleChange = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  return (
    <div className="py-20 min-h-screen">
      <div className="bg-mainLightColor rounded-3xl mb-10 shadow-lg">
        <AppointmentsSearchForm
          setAppointments={setAppointments}
          setDate={setDate}
        />
      </div>

      <div className="py-8 px-10 bg-mainLightColor rounded-3xl mb-10 shadow-lg">
        <div className="flex flex-wrap gap-2.5 justify-between border-b border-textColorDarkBg pb-3 mb-3 md:pb-5 md:mb-5">
          <AdminTitle title={getFilterString(date)} />
          <SearchBar query={query} onSearch={handleChange} />
        </div>
        <AppointmentsTable appointments={filteredAppointments} />
      </div>

      <Flyout appointments={filteredAppointments} date={date} />
    </div>
  );
}
