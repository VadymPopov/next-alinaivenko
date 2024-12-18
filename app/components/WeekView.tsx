'use client';

// fix styles for mobile
// add authentication for admin and gatita
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';

import clsx from 'clsx';
import {
  add,
  addDays,
  format,
  isSameDay,
  setHours,
  startOfWeek,
  sub,
} from 'date-fns';

import { IAppointment } from './AppointmentDetails';
import DayColumn from './DayColumn';

const WeekView = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [week, setWeek] = useState(new Date());
  const weekStart = React.useMemo(
    () => startOfWeek(week, { weekStartsOn: 0 }),
    [week],
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      const weekStart = startOfWeek(week, { weekStartsOn: 0 });
      const weekEnd = addDays(weekStart, 6);

      try {
        const response = await fetch(
          `/api/admin/appointments?start=${format(weekStart, 'yyyy-MM-dd')}&end=${format(weekEnd, 'yyyy-MM-dd')}`,
        );
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const appointments = await response.json();
        setAppointments(appointments);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error
            ? error.message
            : 'Error fetching blocked dates',
        );
      }
    };

    fetchAppointments();
  }, [week]);

  const hours = React.useMemo(
    () => Array.from({ length: 10 }, (_, i) => setHours(new Date(), 11 + i)),
    [],
  );

  const slotHeight = 60;

  const handleNext = () => {
    const nextWeekDate = add(week, { weeks: 1 });
    setWeek(nextWeekDate);
  };

  const handlePrev = () => {
    const nextWeekDate = sub(week, { weeks: 1 });
    setWeek(nextWeekDate);
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-4">
      {/* Week Header */}
      <div className="text-center mb-4 flex justify-end items-center gap-4">
        <h2 className="text-2xl font-bold">
          {format(weekStart, 'MMMM, yyyy')}
        </h2>

        <div className="flex justify-center items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="rounded-md p-2 bg-mainLightColor hover:bg-mainDarkColor hover:text-mainLightColor transition-colors"
          >
            <MdOutlineArrowBackIos />
          </button>
          <button
            type="button"
            onClick={() => setWeek(new Date())}
            className="h-8 flex justify-center items-center  rounded-md p-2 bg-mainLightColor hover:bg-mainDarkColor hover:text-mainLightColor transition-colors"
          >
            Today
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-md p-2 bg-mainLightColor hover:bg-mainDarkColor hover:text-mainLightColor transition-colors"
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>

      {/* Week Days Header */}
      <div className="ml-[108px] grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 7 }).map((_, i) => {
          const day = addDays(weekStart, i);
          const isSame = isSameDay(day, new Date());
          return (
            <div
              key={i}
              className={clsx(
                isSame ? 'bg-mainDarkColor' : 'bg-mainLightColor',
                'text-center p-2 rounded-xl',
              )}
            >
              <div
                className={clsx(
                  isSame ? 'text-mainLightColor' : 'text-textColor',
                  'font-medium text-sm ',
                )}
              >
                {format(day, 'EEEE')}
              </div>
              <div
                className={clsx(
                  isSame ? 'text-mainLightColor' : 'text-cardColor',
                  'font-bold text-xl',
                )}
              >
                {format(day, 'd')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time Header Grid + Appointments */}
      <div className="grid grid-cols-[100px_repeat(7,_1fr)] gap-2 relative">
        {/* Time Header */}
        <div className="flex flex-col items-end pr-2">
          {hours.map((hour, i) => (
            <div
              key={i}
              className={clsx(
                format(hour, 'h a') === '8 PM' ? 'h-0' : 'h-[120px]',
                ' text-sm font-medium text-cardColor flex items-start',
              )}
            >
              {format(hour, 'h a')}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        {Array.from({ length: 7 }).map((_, i) => (
          <DayColumn
            key={i}
            day={addDays(weekStart, i)}
            appointments={appointments}
            slotHeight={slotHeight}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekView;
