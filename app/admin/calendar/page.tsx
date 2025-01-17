import AvailabilityCalendar from '@/components/admin/AvailabilityCalendar';
import BlockSlotForm from '@/components/admin/BlockSlotForm';
import SetMaxBookingDateForm from '@/components/admin/SetMaxBookingDateForm';
import StudioInfoForm from '@/components/admin/StudioInfoForm';

import React, { Suspense, use } from 'react';

async function getMaxDate() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/calendar/max-date`,
    { cache: 'no-store' },
  );
  if (!response.ok)
    throw new Error(`Failed to fetch max date: ${response.statusText}`);
  return response.json();
}

async function getBlockedDates() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.toLocaleString('default', {
    year: 'numeric',
  });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/calendar/?month=${currentMonth}&year=${currentYear}`,
    { cache: 'no-store' },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch blocked dates: ${response.statusText}`);
  }
  return response.json();
}

async function getStudioInfo() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/calendar/studio`,
  );
  if (!response.ok)
    throw new Error(
      `Failed to fetch studio information: ${response.statusText}`,
    );
  return response.json();
}

export default function CalendarPage() {
  const maxDate = use(getMaxDate());
  const blockedDates = use(getBlockedDates());
  const studio = use(getStudioInfo());
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-mainLightColor rounded-3xl shadow-lg">
        <Suspense fallback={<p>Loading...</p>}>
          <SetMaxBookingDateForm maxDate={maxDate} />
        </Suspense>
      </div>

      <div className="bg-mainLightColor rounded-3xl shadow-lg">
        <Suspense fallback={<p>Loading...</p>}>
          <AvailabilityCalendar initialDates={blockedDates} />
        </Suspense>
      </div>

      <div className="bg-mainLightColor rounded-3xl shadow-lg">
        <BlockSlotForm />
      </div>
      <div className="bg-mainLightColor rounded-3xl shadow-lg">
        <Suspense fallback={<p>Loading...</p>}>
          <StudioInfoForm studio={studio} />
        </Suspense>
      </div>
    </div>
  );
}
