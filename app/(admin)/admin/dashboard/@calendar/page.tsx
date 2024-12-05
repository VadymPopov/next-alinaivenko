'use client';

import DayView from '@/app/components/DayView';
import WeekView from '@/app/components/WeekView';

import React, { useState } from 'react';

import clsx from 'clsx';

const app = [
  {
    _id: '6735311236830fbfc6132c2a',
    name: 'Vincent Valiente',
    email: 'vadympopov.dev@gmail.com',
    phone: '4372581793',
    service: 'Small Tattoo',
    date: 'November 24, 2024',
    slot: '11:30am',
    duration: 120,
  },
  {
    _id: 'b6735311236830fbfc6132c2a',
    name: 'Vadym PopOff',
    email: 'vadympopov.dev@gmail.com',
    phone: '4372581793',
    service: 'Large Tattoo',
    date: 'November 28, 2024',
    slot: '3:00pm',
    duration: 240,
  },
  {
    _id: 'c6735311236830fbfc6132c2a',
    name: 'Alina Ivenko',
    email: 'vadympopov.dev@gmail.com',
    phone: '4372581793',
    service: 'Permanent Makeup',
    date: 'November 25, 2024',
    slot: '1:00pm',
    duration: 60,
  },
  {
    _id: 'd6735311236830fbfc6132c2a',
    name: 'Alina Gatita',
    email: 'vadympopov.dev@gmail.com',
    phone: '4372581793',
    service: 'Touch-up',
    date: 'November 25, 2024',
    slot: '3:30pm',
    duration: 30,
  },
  {
    _id: 'e6735311236830fbfc6132c2a',
    name: 'Alina Gatita',
    email: 'vadympopov.dev@gmail.com',
    phone: '4372581793',
    service: 'Touch-up',
    date: 'December 1, 2024',
    slot: '3:30pm',
    duration: 30,
  },
  {
    _id: 'g6735311236830fbfc6132c2a',
    name: 'Alina Gatita',
    email: 'vadympopov.dev@gmail.com',
    phone: '4372581793',
    service: 'Touch-up',
    date: 'December 3, 2024',
    slot: '3:30pm',
    duration: 30,
  },
];

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
      {activeView === 'day' ? <DayView /> : <WeekView appointments={app} />}
    </>
  );
}
