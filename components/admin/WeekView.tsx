'use client';

import BlockedSlotView from '@/components/admin/BlockedSlotView';
import DayColumn from '@/components/admin/DayColumn';
import WeekViewAppointment from '@/components/admin/WeekViewAppointment';
import useAppointments from '@/hooks/useAppointments';
import useBlockedDates from '@/hooks/useBlockedDates';
import useBlockedSlots from '@/hooks/useBlockedSlots';
import { filterDate, getCombinedApptSlots } from '@/utils/helpers';

import React, { useState } from 'react';
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

export interface IBlockedSlot {
  _id: string;
  date: string;
  slot: string;
  duration: number;
  reason: string;
}

const WeekView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [week, setWeek] = useState(new Date());
  const start = React.useMemo(
    () => startOfWeek(week, { weekStartsOn: 0 }),
    [week],
  );
  const end = addDays(start, 6);

  const { slots: blockedSlots = [] } = useBlockedSlots({ start, end });
  const { dates: blockedDates = [] } = useBlockedDates(currentDate);
  const { appointments = [] } = useAppointments({
    start: format(start, 'yyyy-MM-dd'),
    end: format(end, 'yyyy-MM-dd'),
  });

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
          {format(start, 'MMMM, yyyy')}
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
          const day = addDays(start, i);
          const isSame = isSameDay(day, new Date());
          const formattedDay = format(day, 'yyyy-MM-dd');
          const combinedApptSlots = getCombinedApptSlots(
            blockedSlots,
            appointments,
          );
          const filteredAppt = combinedApptSlots.filter(
            (appt) => formattedDay === appt.date,
          );

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
            day={addDays(start, i)}
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
