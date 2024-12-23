import React from 'react';

import { IAppointment } from './AppointmentDetails';
import AppointmentRow from './AppointmentRow';

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
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-separate border-spacing-y-2 hidden lg:table">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="pb-5 font-semibold text-sm xl:text-lg">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment) => (
              <AppointmentRow key={appointment._id} appointment={appointment} />
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-5 text-lg "
              >
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="grid sm:grid-cols-2 gap-4 lg:hidden">
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment) => (
            <AppointmentRow key={appointment._id} appointment={appointment} />
          ))
        ) : (
          <div className="text-center text-lg py-5">No appointments found.</div>
        )}
      </div>
    </div>
  );
}
