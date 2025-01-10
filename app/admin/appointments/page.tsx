'use client';

import AdminTitle from '@/app/components/AdminTitle';
import AppointmentsSearchForm from '@/app/components/AppointmentsSearchForm';
import AppointmentsTable from '@/app/components/AppointmentsTable';
import Flyout from '@/app/components/Flyout';
import SearchBar from '@/app/components/SearchBar';
import { apptTableHeaders } from '@/app/constants/constants';
import useAppointments from '@/app/hooks/useAppointments';
import { getFilterString } from '@/app/utils/helpers';

import React, { useMemo, useState } from 'react';

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

  const { isLoading, appointments, error } = useAppointments(date);

  const filteredAppointments = useMemo(() => {
    return appointments
      ? appointments?.filter(
          (appointment) =>
            appointment.name.toLowerCase().includes(query.toLowerCase()) ||
            appointment.email.toLowerCase().includes(query.toLowerCase()),
        )
      : [];
  }, [appointments, query]);

  const handleChange = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  if (error) {
    return (
      <p className="text-error">
        Failed to load appointments. Please try again later.
      </p>
    );
  }

  return (
    <>
      <div className="bg-mainLightColor rounded-3xl mb-5 shadow-lg">
        <AppointmentsSearchForm setDate={setDate} />
      </div>

      <div className="py-2.5 px-4 md:py-4 md:px-8 bg-mainLightColor rounded-3xl shadow-lg">
        <div className="flex flex-wrap gap-2.5 justify-between border-b border-textColorDarkBg pb-4 md:pb-5">
          <AdminTitle title={getFilterString(date)} />
          <SearchBar query={query} onSearch={handleChange} />
        </div>
        <AppointmentsTable
          isLoading={isLoading}
          appointments={filteredAppointments}
          headers={apptTableHeaders}
        />
      </div>

      <Flyout appointments={filteredAppointments} date={date} />
    </>
  );
}
