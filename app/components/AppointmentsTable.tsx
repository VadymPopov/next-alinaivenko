import React from 'react';

import AppointmentsRow from './AppointmentsRow';

const headers = [
  'Client',
  'Email',
  'Instagram',
  'Service',
  'Date',
  'Slot',
  'Duration',
];

export default function AppointmentsTable({ data }) {
  return (
    <div className="py-8 px-10 bg-bgColor">
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
          {data && data.length > 0 ? (
            data.map((appointment) => (
              <AppointmentsRow
                key={appointment._id}
                appointment={appointment}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-5 text-lg bg-mainLightColor"
              >
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
