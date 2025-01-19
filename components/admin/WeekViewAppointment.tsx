'use client';

import { useSidebar } from '@/providers/SidebarContext';
import { convertToTimeRange } from '@/utils';

import React from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface WeekViewAppointmentProps {
  appointment: {
    _id: string;
    name: string;
    date: string;
    slot: string;
    duration: number;
    service: string;
  };
  className?: string;
  style?: {
    height: string;
    top: string;
  };
}

export function WeekViewAppointment({
  appointment,
  className,
  style,
}: WeekViewAppointmentProps) {
  const router = useRouter();
  const { isExtended } = useSidebar();

  return (
    <div
      onClick={() => router.push(`/admin/appointments/${appointment._id}`)}
      style={style}
      className={clsx(
        className,
        'text-center px-1 lg:py-0.5 lg:px-3.5 shadow-md rounded-xl md:rounded-lg text-xs lg:text-sm hover:border cursor-pointer border-transparent border flex flex-col justify-center items-center',
        appointment.service === 'Small Tattoo' &&
          'text-[#2D6A4F] bg-[#D8F3DC] hover:border-[#2D6A4F] ',
        appointment.service === 'Large Tattoo' &&
          'text-[#A4161A] bg-[#FFD6D9] hover:border-[#A4161A]',
        appointment.service === 'Touch-up' &&
          'text-[#FF6700] bg-[#FFE5CC] hover:border-[#FF6700]',
        appointment.service === 'Permanent Makeup' &&
          'text-[#0077B6] bg-[#D0EFFF] hover:border-[#0077B6]',
      )}
    >
      <p className={clsx('font-medium', isExtended ? 'text-xs' : ' text-sm')}>
        {appointment.name}
      </p>
      <p className="text-textColor">
        {convertToTimeRange(appointment.slot, appointment.duration)}
      </p>
      <p className="text-xs">{appointment.service}</p>
    </div>
  );
}
