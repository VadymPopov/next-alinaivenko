'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { formatDuration } from '../utils/helpers';
import { IAppointment } from './AppointmentDetails';
import ServiceLabel from './ServiceLabel';

export default function AppointmentsRow({
  appointment,
}: {
  appointment: IAppointment;
}) {
  const { _id, name, email, service, date, duration, instagram, slot } =
    appointment;
  const router = useRouter();

  return (
    <tr
      className="h-14 text-center bg-bgColor hover:cursor-pointer hover:shadow-lg hover:bg-mainLightColor transition-colors"
      onClick={() => router.push(`/admin/appointments/${_id}`)}
    >
      <td className="font-medium text-accentColor rounded-l border-l-4 border-accentColor">
        {name}
      </td>
      <td className="text-sm">{email}</td>
      <td className="text-sm">{instagram}</td>
      <td>
        <ServiceLabel service={service} />
      </td>
      <td className="rounded-r">
        {/* {new Date(date).toLocaleDateString('uk-UA')} */}
        {format(new Date(date), 'dd.MM.yyyy')}
      </td>
      <td>{slot}</td>
      <td>{formatDuration(duration)}</td>
    </tr>
  );
}
