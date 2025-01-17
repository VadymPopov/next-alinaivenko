'use client';

import AppointmentRow from '@/components/admin/AppointmentRowView';
import { NEW_APPT_TABLE_HEADERS } from '@/constants/constants';

import React from 'react';

import { IAppointment } from './AppointmentDetails';

interface AppointmentsTableProps {
  appointments: IAppointment[];
}

export default function NewAppointmentsTable({
  appointments,
}: AppointmentsTableProps) {
  return (
    <table className="table-auto w-full border-separate border-spacing-y-2">
      <thead>
        <tr>
          {NEW_APPT_TABLE_HEADERS.map((header, i) => (
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
