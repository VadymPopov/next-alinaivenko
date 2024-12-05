'use client';

import React from 'react';
import { MdAdd } from 'react-icons/md';

import clsx from 'clsx';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { convertToTimeRange } from '../utils/convertToTimeRange';

export default function DayColumn({ day, appointments, slotHeight }) {
  const timeSlots = React.useMemo(() => {
    const slots: string[] = [];
    for (let i = 0; i < 18; i++) {
      const hour = 11 + Math.floor(i / 2);
      const minute = i % 2 === 0 ? '00' : '30';
      const period = hour < 12 ? 'am' : 'pm';
      const formattedHour = hour > 12 ? hour - 12 : hour;
      slots.push(`${formattedHour}:${minute}${period}`);
    }
    return slots;
  }, []);

  const router = useRouter();

  return (
    <div className="relative bg-mainLightColor rounded-xl">
      <div className="grid grid-rows-[repeat(18,_minmax(0,_1fr))]">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className="flex justify-center items-center p-2 rounded-lg  text-sm h-[60px] border border-transparent hover:border-dashed hover:border-mainDarkColor cursor-pointer group"
            onClick={() =>
              router.push(`/admin/appointments/add?slot=${slot}&date=${day}`)
            }
          >
            <div className="text-textColor invisible rounded-full border group-hover:visible">
              <MdAdd size={12} />
            </div>
          </div>
        ))}
        {appointments
          .filter((appt) => format(day, 'MMMM dd, yyyy') === appt.date)
          .map((appt, idx) => {
            const [time, period] = appt.slot.split(/(am|pm)/i);
            const [startHours, startMinutes] = time.split(':').map(Number);
            const isPM = period.toLowerCase() === 'pm';
            const adjustedHours =
              isPM && startHours !== 12 ? startHours + 12 : startHours;
            const relativeHours = adjustedHours - 11;
            const topPosition = (relativeHours * 60 + startMinutes) / 30;

            return (
              <div
                onClick={() => router.push(`/admin/appointments/${appt._id}`)}
                key={idx}
                style={{
                  height: `${(appt.duration / 30) * slotHeight}px`,
                  top: `${topPosition * slotHeight}px`,
                }}
                className={clsx(
                  'absolute left-0 right-0 text-center py-0.5 px-3.5 shadow-md rounded-lg text-sm hover:border cursor-pointer border-transparent border',
                  appt.service === 'Small Tattoo' &&
                    'text-[#2D6A4F] bg-[#D8F3DC] hover:border-[#2D6A4F] ',
                  appt.service === 'Large Tattoo' &&
                    'text-[#A4161A] bg-[#FFD6D9] hover:border-[#A4161A]',
                  appt.service === 'Touch-up' &&
                    'text-[#FF6700] bg-[#FFE5CC] hover:border-[#FF6700]',
                  appt.service === 'Permanent Makeup' &&
                    'text-[#0077B6] bg-[#D0EFFF] hover:border-[#0077B6]',
                )}
              >
                <p className="font-medium">{appt.name}</p>
                <p className="text-textColor">
                  {convertToTimeRange(appt.slot, appt.duration)}
                </p>
                <p>{appt.service}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
