import ScheduleForm from '@/app/components/ScheduleForm';

import React from 'react';

async function getMaxDate() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/calendar/max-date`,
  );
  if (!response.ok)
    throw new Error(`Failed to fetch max date: ${response.statusText}`);
  return response.json();
}

async function getFirstAvailableDate(duration: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/calendar/available-date?duration=${duration}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch available date: ${response.statusText}`);
  }
  return response.json();
}

export default async function Schedule({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { duration = '60' } = await searchParams;

  let availableDate, maxDate;

  try {
    [availableDate, maxDate] = await Promise.all([
      getFirstAvailableDate(duration),
      getMaxDate(),
    ]);
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Error fetching schedule data';
    throw new Error(`${errorMessage}`);
  }

  return (
    <>
      <ScheduleForm
        availableDate={availableDate.date}
        initialSlots={availableDate.slots}
        maxDate={maxDate}
        blockedDates={availableDate.blockedDates}
        duration={Number(duration)}
      />
    </>
  );
}
