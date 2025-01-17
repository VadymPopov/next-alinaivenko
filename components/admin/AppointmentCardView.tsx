'use client';

import ServiceLabel from '@/components/ui/ServiceLabel';
import { formatCurrency } from '@/utils/helpers';
import { formatDuration } from '@/utils/helpers';
import { getParsedDate } from '@/utils/helpers';

import { MdOutlineEmail } from 'react-icons/md';
import { SiInstagram } from 'react-icons/si';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { IAppointment } from './AppointmentDetails';

export default function AppointmentCardView({
  appointment,
  isNew,
}: {
  appointment: IAppointment;
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

  return (
    <div
      className="flex sm:flex-wrap items-center gap-2.5 justify-between lg:hidden border border-accentColor rounded-lg p-4 bg-mainLightColor hover:cursor-pointer shadow-lg hover:shadow-none hover:bg-bgColor transition-colors"
      onClick={() => router.push(`/admin/appointments/${_id}`)}
    >
      <div>
        <div className="mb-2">
          <span className="text-sm text-textColor">
            {format(getParsedDate(date), 'dd.MM.yyyy')}
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
        {!isNew && instagram && (
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
        {!isNew && (
          <div>
            <span className="font-semibold text-sm text-accentColor">
              {formatDuration(duration)}
            </span>
          </div>
        )}
        {isNew && (
          <div>
            <span className="font-semibold text-sm text-accentColor">
              {formatCurrency(deposit?.amount)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
