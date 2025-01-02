'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';

import clsx from 'clsx';
import {
  add,
  addDays,
  format,
  isSameDay,
  parse,
  setHours,
  startOfWeek,
  sub,
} from 'date-fns';

import { filterDate } from '../utils/helpers';
import { IAppointment } from './AppointmentDetails';
import BlockedSlotView from './BlockedSlotView';
import DayColumn from './DayColumn';
import WeekViewAppointment from './WeekViewAppointment';

export interface IBlockedSlot {
  _id: string;
  date: string;
  slot: string;
  duration: number;
  reason: string;
}

const WeekView = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<IBlockedSlot[]>([]);
  const [week, setWeek] = useState(new Date());
  const weekStart = React.useMemo(
    () => startOfWeek(week, { weekStartsOn: 0 }),
    [week],
  );
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = currentDate.toLocaleString('default', {
    month: 'long',
  });
  const currentYear = currentDate.toLocaleString('default', {
    year: 'numeric',
  });

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const response = await fetch(
          `/api/admin/calendar?month=${currentMonth}&year=${currentYear}`,
        );
        if (!response.ok) throw new Error('Failed to fetch blocked dates');
        const data = await response.json();
        const dates = data.blockedDates || [];
        setBlockedDates(dates);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error
            ? error.message
            : 'Error fetching blocked dates',
        );
      }
    };

    fetchBlockedDates();
  }, [currentMonth, currentYear]);

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

  useEffect(() => {
    const fetchBlockedSlots = async () => {
      const weekStart = startOfWeek(week, { weekStartsOn: 0 });
      const weekEnd = addDays(weekStart, 6);

      try {
        const response = await fetch(
          `/api/admin/calendar/blocked-slots?start=${format(weekStart, 'yyyy-MM-dd')}&end=${format(weekEnd, 'yyyy-MM-dd')}`,
        );
        if (!response.ok) throw new Error('Failed to fetch blocked slots');
        const blockedSlots = await response.json();
        setBlockedSlots(blockedSlots);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error
            ? error.message
            : 'Error fetching blocked slots',
        );
      }
    };

    fetchBlockedSlots();
  }, [week]);

  const hours = React.useMemo(
    () => Array.from({ length: 10 }, (_, i) => setHours(new Date(), 11 + i)),
    [],
  );

  const slotHeight = 60;

  const handleNext = () => {
    const nextWeekDate = add(week, { weeks: 1 });
    setWeek(nextWeekDate);
    setCurrentDate(nextWeekDate);
  };

  const handlePrev = () => {
    const prevWeekDate = sub(week, { weeks: 1 });
    setWeek(prevWeekDate);
    setCurrentDate(prevWeekDate);
  };

  return (
    <div className="w-full  mt-4">
      <div className="text-center mb-4 flex justify-end items-center gap-4 sticky">
        <h2 className="text-lg md:text-2xl font-bold">
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

      <div className="md:ml-[108px] md:grid grid-cols-7 gap-4 flex flex-col ">
        {Array.from({ length: 7 }).map((_, i) => {
          const day = addDays(weekStart, i);
          const isSame = isSameDay(day, new Date());
          const formattedDay = format(day, 'yyyy-MM-dd');
          const filteredAppt = [...blockedSlots, ...appointments]
            .sort((a, b) => {
              const dateA = parse(a.slot, 'hh:mma', new Date());
              const dateB = parse(b.slot, 'hh:mma', new Date());
              return dateA.getTime() - dateB.getTime();
            })
            .filter((appt) => formattedDay === appt.date);

          const date = new Date(day);
          const isBlocked = filterDate(date, blockedDates);

          return (
            <div
              key={i}
              className="border border-textColorDarkBg rounded-xl md:mb-2.5 shadow-2xl overflow-hidden"
            >
              <div
                className={clsx(
                  isSame ? 'bg-mainDarkColor' : 'bg-mainLightColor',
                  'text-center p-2 rounded-xl mb-2 md:mb-0 shadow-md',
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
              <div className="md:hidden flex flex-col gap-2">
                {filteredAppt.length !== 0 ? (
                  filteredAppt.map((appt) =>
                    'reason' in appt ? (
                      <BlockedSlotView
                        key={appt._id}
                        blockedSlot={appt}
                        className="relative"
                      />
                    ) : (
                      <WeekViewAppointment key={appt._id} appointment={appt} />
                    ),
                  )
                ) : (
                  <div
                    className={clsx(
                      'flex justify-center text-sm p-2',
                      isBlocked ? ' dayoff' : 'bg-mainLightColor',
                    )}
                  >
                    {' '}
                    {isBlocked ? (
                      <p className="text-cardColor ">
                        It&apos;s your day off! Enjoy your break.
                      </p>
                    ) : (
                      <p>No appointments scheduled for this day</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden md:grid grid-cols-[100px_repeat(7,_1fr)] gap-2 relative">
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

        {Array.from({ length: 7 }).map((_, i) => (
          <DayColumn
            key={i}
            day={addDays(weekStart, i)}
            appointments={appointments}
            slotHeight={slotHeight}
            blockedDates={blockedDates}
            blockedSlots={blockedSlots}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekView;
