'use client';

import { IAppointment } from '@/app/components/AppointmentDetails';
import AppointmentsSearchForm from '@/app/components/AppointmentsSearchForm';
import AppointmentsTable from '@/app/components/AppointmentsTable';
import Button from '@/app/components/Button';
import SearchBar from '@/app/components/SearchBar';

import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function Appointments() {
  const [query, setQuery] = useState<string>('');
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `/api/appointments?date=${format(new Date(), 'MMMM dd, yyyy')}`,
        {
          cache: 'no-store',
        },
      );
      const appointments = await response.json();
      setAppointments(appointments);
    })();
  }, []);

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.name.toLowerCase().includes(query.toLowerCase()) ||
      appointment.email.toLowerCase().includes(query.toLowerCase()),
  );

  const handleChange = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  return (
    <div className="bg-bgColor py-4 px-10 min-h-screen">
      <div className="flex justify-end">
        <Button
          styles="rounded-xl px-3 py-2 h-10 mb-5"
          onClick={() =>
            router.push('/admin/appointments/add', { scroll: false })
          }
        >
          Add Appointment
          <MdAdd size={24} />
        </Button>
      </div>
      <div className="flex justify-between py-6 px-10 bg-mainLightColor rounded-3xl mb-10 shadow-lg">
        <h2 className="text-accentColor font-semibold text-2xl">
          Search Appointments by Date
        </h2>
        <AppointmentsSearchForm setAppointments={setAppointments} />
      </div>

      <div className="py-8 px-10 bg-mainLightColor rounded-3xl mb-10 shadow-lg">
        <div className="flex justify-between border-b border-textColorDarkBg pb-5 mb-3">
          <h2 className="text-accentColor font-semibold text-2xl">
            Appointments
          </h2>
          <SearchBar query={query} onSearch={handleChange} />
        </div>
        <AppointmentsTable appointments={filteredAppointments} />
      </div>
    </div>
  );
}
