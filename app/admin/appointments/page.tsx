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

export const tableHeaders = [
  'Client',
  'Email',
  'Instagram',
  'Service',
  'Date',
  'Slot',
  'Duration',
];

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
    <>
      <div className="bg-mainLightColor rounded-3xl mb-5 shadow-lg">
        <AppointmentsSearchForm
          setAppointments={setAppointments}
          setDate={setDate}
        />
      </div>

      <div className="py-2.5 px-4 md:py-4 md:px-8 bg-mainLightColor rounded-3xl shadow-lg">
        <div className="flex flex-wrap gap-2.5 justify-between border-b border-textColorDarkBg pb-4 md:pb-5">
          <AdminTitle title={getFilterString(date)} />
          <SearchBar query={query} onSearch={handleChange} />
        </div>
        <AppointmentsTable
          appointments={filteredAppointments}
          headers={tableHeaders}
        />
      </div>

      <Flyout appointments={filteredAppointments} date={date} />
    </>
  );
}
