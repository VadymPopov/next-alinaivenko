'use client';

import React from 'react';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { formatCurrency } from '../utils/helpers';
import { IAppointment } from './AppointmentDetails';
import ServiceLabel from './ServiceLabel';

interface AppointmentsTableProps {
  appointments: IAppointment[];
}

const headers = ['Client', 'Email', 'Deposit', 'Service', 'Date', 'Slot'];

export default function NewAppointmentsTable({
  appointments,
}: AppointmentsTableProps) {
  const router = useRouter();
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
          appointments.map(
            ({ _id, name, email, service, date, slot, deposit }) => (
              <tr
                key={_id}
                className="h-14 text-center bg-bgColor hover:cursor-pointer hover:shadow-lg hover:bg-mainLightColor transition-colors"
                onClick={() => router.push(`/admin/appointments/${_id}`)}
              >
                <td className="font-medium text-accentColor rounded-l border-l-4 border-accentColor">
                  {name}
                </td>
                <td className="text-sm">{email}</td>
                <td className="text-sm">{formatCurrency(deposit?.amount)}</td>
                <td>
                  <ServiceLabel service={service} />
                </td>
                <td className="rounded-r">
                  {format(new Date(date), 'dd.MM.yyyy')}
                </td>
                <td>{slot}</td>
              </tr>
            ),
          )}
      </tbody>
    </table>
  );
}
