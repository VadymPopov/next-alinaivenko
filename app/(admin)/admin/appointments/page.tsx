'use client';

import AppointmentsSearchForm from '@/app/components/AppointmentsSearchForm';
import AppointmentsTable from '@/app/components/AppointmentsTable';
import Button from '@/app/components/Button';

// import SearchBar from '@/app/components/SearchBar';
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function Appointments() {
  // const [query, setQuery] = useState<string>('');
  const [appointments, setAppointments] = useState([]);
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

  // const handleChange = (searchTerm: string) => {
  //   setQuery(searchTerm);
  //   // filterData(searchTerm);
  // };
  return (
    <>
      {/* <SearchBar query={query} onSearch={handleChange} /> */}
      <div className="flex justify-between py-6 px-10">
        <AppointmentsSearchForm setAppointments={setAppointments} />
        <Button
          styles="rounded-xl px-3 py-2 h-10"
          onClick={() =>
            router.push('/admin/appointments/add', { scroll: false })
          }
        >
          Add Appointment
          <MdAdd size={24} />
        </Button>
      </div>

      <AppointmentsTable data={appointments} />
    </>
  );
}
