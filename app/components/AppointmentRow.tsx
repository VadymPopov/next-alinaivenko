'use client';

import { MdOutlineEmail } from 'react-icons/md';
import { SiInstagram } from 'react-icons/si';

import { format, parse } from 'date-fns';
import { useRouter } from 'next/navigation';

import { formatDuration } from '../utils/helpers';
import { IAppointment } from './AppointmentDetails';
import ServiceLabel from './ServiceLabel';

export default function AppointmentRow({
  appointment,
}: {
  appointment: IAppointment;
}) {
  const { _id, name, email, service, date, duration, instagram, slot } =
    appointment;
  const router = useRouter();
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

  return (
    <>
      <tr
        className="hidden lg:table-row h-14 text-center bg-bgColor hover:cursor-pointer hover:shadow-lg hover:bg-mainLightColor transition-colors"
        onClick={() => router.push(`/admin/appointments/${_id}`)}
      >
        <td className="font-medium text-sm xl:text-lg text-accentColor rounded-l border-l-4 border-accentColor">
          {name}
        </td>
        <td className="md:text-xs text-sm">{email}</td>
        <td className="md:text-xs text-sm">{instagram}</td>
        <td>
          <ServiceLabel service={service} />
        </td>
        <td className="rounded-r md:text-xs text-sm">
          {format(parsedDate, 'dd.MM.yyyy')}
        </td>
        <td className="md:text-xs text-sm">{slot}</td>
        <td className="md:text-xs text-sm">{formatDuration(duration)}</td>
      </tr>

      <div
        className="flex sm:flex-wrap items-center gap-2.5 justify-between lg:hidden border border-accentColor rounded-lg p-4 mb-4 bg-mainLightColor hover:cursor-pointer shadow-lg hover:shadow-none hover:bg-bgColor transition-colors"
        onClick={() => router.push(`/admin/appointments/${_id}`)}
      >
        <div>
          <div className="mb-2">
            <span className="text-sm text-textColor">
              {format(parsedDate, 'dd.MM.yyyy')}
            </span>
          </div>
          <div className="mb-2 font-bold text-lg text-accentColor">
            <span className="uppercase">{name}</span>
          </div>
          <div className="mb-2 flex gap-1 sm:gap-2 items-center">
            <MdOutlineEmail className="size-4 text-cardColor" />
            <span className="font-medium text-xs sm:text-sm text-textColor">
              {email}
            </span>
          </div>
          {instagram && (
            <div className="mb-2 flex gap-1 sm:gap-2 items-center">
              <SiInstagram className="size-4 text-cardColor" />
              <span className="font-medium text-xs sm:text-sm text-textColor">
                {instagram}
              </span>
            </div>
          )}
          <div className="mb-2">
            <ServiceLabel service={service} />
          </div>
        </div>

        <div>
          <div className="mb-2">
            <span className="font-semibold text-base sm:text-lg md:text-xl text-cardColor">
              {slot}
            </span>
          </div>
          <div>
            <span className="font-semibold text-sm text-accentColor">
              {formatDuration(duration)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
