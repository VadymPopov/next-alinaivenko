'use client';

import React from 'react';

import { IAppointment } from './AppointmentDetails';
import AppointmentRow from './AppointmentRowView';

interface AppointmentsTableProps {
  appointments: IAppointment[];
}

const headers = ['Client', 'Email', 'Deposit', 'Service', 'Date', 'Slot'];

export default function NewAppointmentsTable({
  appointments,
}: AppointmentsTableProps) {
  return (
    <table className="table-auto w-full border-separate border-spacing-y-2">
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} className="pb-5 font-semibold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {appointments &&
          appointments.length > 0 &&
          appointments.map((appointment) => (
            <AppointmentRow
              key={appointment._id}
              appointment={appointment}
              isNew={true}
            />
          ))}
      </tbody>
    </table>
  );
}
