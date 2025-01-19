'use client';

import { DayView, WeekView } from '@/components/admin';

import React, { useState } from 'react';

import clsx from 'clsx';

export default function Page() {
  const [activeView, setActiveView] = useState('week');

  return (
    <>
      <div className="flex justify-center items-center bg-mainLightColor w-28 p-1 rounded-md">
        <button
          type="button"
          onClick={() => setActiveView('week')}
          className={clsx(
            activeView === 'week'
              ? 'bg-mainDarkColor text-mainLightColor'
              : 'hover:text-textColorDarkBg transition-colors',
            'h-8 flex justify-center items-center rounded-md p-2 ',
          )}
        >
          Week
        </button>
        <button
          type="button"
          onClick={() => setActiveView('day')}
          className={clsx(
            activeView === 'day'
              ? 'bg-mainDarkColor text-mainLightColor'
              : 'hover:text-textColorDarkBg transition-colors',
            'h-8 flex justify-center items-center rounded-md p-2 ',
          )}
        >
          Day
        </button>
      </div>
      {activeView === 'day' ? <DayView /> : <WeekView />}
    </>
  );
}
