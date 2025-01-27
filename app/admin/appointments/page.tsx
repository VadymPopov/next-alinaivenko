'use client';

import {
  AdminTitle,
  AppointmentsSearchForm,
  AppointmentsTable,
  Flyout,
} from '@/components/admin';
import { SearchBar } from '@/components/ui';
import { APPT_TABLE_HEADERS } from '@/constants';
import { useAppointments } from '@/hooks';
import { SearchDate } from '@/types';
import { getFilterString } from '@/utils/helpers';

import React, { useMemo, useState } from 'react';

const defaultDate = {
  day: new Date().getDate(),
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

export default function Appointments() {
  const [date, setDate] = useState<SearchDate>(defaultDate);
  const [query, setQuery] = useState<string>('');

  const { isLoading, appointments, error } = useAppointments({
    day: date.day,
    month: date.month,
    year: date.year,
  });

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
          headers={APPT_TABLE_HEADERS}
        />
      </div>

      <Flyout appointments={filteredAppointments} date={date} />
    </>
  );
}
