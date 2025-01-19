'use client';

import ServiceLabel from '@/components/ui/ServiceLabel';
import { Appointment } from '@/types';
import { formatCurrency, getParsedDate } from '@/utils/helpers';
import { formatDuration } from '@/utils/helpers';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function AppointmentRow({
  appointment,
  isNew,
}: {
  appointment: Appointment;
  isNew?: boolean;
}) {
  const {
    _id,
    name,
    email,
    service,
    date,
    duration,
    instagram,
    slot,
    deposit,
  } = appointment;
  const router = useRouter();
  const parsedDate = getParsedDate(date);

  return (
    <tr
      className="hidden lg:table-row h-14 text-center bg-bgColor hover:cursor-pointer hover:shadow-lg hover:bg-mainLightColor transition-colors"
      onClick={() => router.push(`/admin/appointments/${_id}`)}
    >
      <td className="font-medium text-sm xl:text-lg text-accentColor rounded-l border-l-4 border-accentColor">
        {name}
      </td>
      <td className="md:text-xs text-sm">{email}</td>
      {isNew && (
        <td className="md:text-xs text-sm">
          {formatCurrency(deposit?.amount)}
        </td>
      )}
      {!isNew && <td className="md:text-xs text-sm">{instagram}</td>}
      <td>
        <ServiceLabel service={service} />
      </td>
      <td className="rounded-r md:text-xs text-sm">
        {format(parsedDate, 'dd.MM.yyyy')}
      </td>
      <td className="md:text-xs text-sm">{slot}</td>
      {!isNew && (
        <td className="md:text-xs text-sm">{formatDuration(duration)}</td>
      )}
    </tr>
  );
}
