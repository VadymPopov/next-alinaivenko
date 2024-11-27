import React from 'react';

import { IAppointment } from './AppointmentDetails';
import AppointmentsRow from './AppointmentsRow';

interface AppointmentsTableProps {
  appointments: IAppointment[];
}

const headers = [
  'Client',
  'Email',
  'Instagram',
  'Service',
  'Date',
  'Slot',
  'Duration',
];

export default function AppointmentsTable({
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
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment) => (
            <AppointmentsRow key={appointment._id} appointment={appointment} />
          ))
        ) : (
          <tr>
            <td colSpan={headers.length} className="text-center py-5 text-lg ">
              No appointments found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
