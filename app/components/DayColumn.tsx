'use client';

import React from 'react';
import { MdAdd } from 'react-icons/md';

import clsx from 'clsx';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import {
  filterDate,
  getCombinedApptSlots,
  getTimeSlots,
} from '../utils/helpers';
import { IAppointment } from './AppointmentDetails';
import BlockedSlotView from './BlockedSlotView';
import { IBlockedSlot } from './WeekView';
import WeekViewAppointment from './WeekViewAppointment';

interface DayColumnProps {
  day: Date;
  appointments: IAppointment[];
  slotHeight: number;
  blockedDates: string[];
  blockedSlots: IBlockedSlot[];
}

export default function DayColumn({
  day,
  appointments,
  slotHeight,
  blockedDates,
  blockedSlots,
}: DayColumnProps) {
  const timeSlots = React.useMemo(() => {
    return getTimeSlots();
  }, []);

  const date = new Date(day);
  const isBlocked = filterDate(date, blockedDates);
  const router = useRouter();

  return (
    <div className="relative bg-mainLightColor rounded-xl">
      <div className="grid grid-rows-[repeat(18,_minmax(0,_1fr))]">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className={clsx(
              'sm:flex justify-center items-center p-2 rounded-lg  text-sm h-[60px] border border-transparent  group',
              isBlocked
                ? 'cursor-not-allowed dayoff'
                : 'hover:border-dashed hover:border-mainDarkColor cursor-pointer',
            )}
            onClick={
              !isBlocked
                ? () =>
                    router.push(
                      `/admin/appointments/add?slot=${slot}&date=${day}`,
                    )
                : undefined
            }
          >
            <div
              className={clsx(
                isBlocked ? 'hidden' : 'blocked',
                'text-textColor invisible rounded-full border group-hover:visible',
              )}
            >
              <MdAdd size={12} />
            </div>
          </div>
        ))}
        {getCombinedApptSlots(blockedSlots, appointments)
          .filter((appt) => format(day, 'yyyy-MM-dd') === appt.date)
          .map((appt) => {
            const [time, period] = appt.slot.split(/(am|pm)/i);
            const [startHours, startMinutes] = time.split(':').map(Number);
            const isPM = period.toLowerCase() === 'pm';
            const adjustedHours =
              isPM && startHours !== 12 ? startHours + 12 : startHours;
            const relativeHours = adjustedHours - 11;
            const topPosition = (relativeHours * 60 + startMinutes) / 30;
            const height = (appt.duration / 30) * slotHeight;
            const top = topPosition * slotHeight;

            const dynamicStyle = {
              height: `${height}px`,
              top: `${top}px`,
            };

            if ('reason' in appt) {
              return (
                <BlockedSlotView
                  key={appt._id}
                  blockedSlot={appt}
                  style={dynamicStyle}
                  className="absolute left-0 right-0"
                />
              );
            } else {
              return (
                <WeekViewAppointment
                  key={appt._id}
                  appointment={appt}
                  style={dynamicStyle}
                  className="absolute left-0 right-0"
                />
              );
            }
          })}
      </div>
    </div>
  );
}
