import { ScheduleForm } from '@/components/site';
import { getFirstAvailableDate, getMaxDate } from '@/services';

import React, { Suspense, use } from 'react';

export default function Schedule({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { duration = '60' } = searchParams;
  const availableDate = use(getFirstAvailableDate(duration));
  const maxDate = use(getMaxDate());

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ScheduleForm
        availableDate={availableDate.date}
        initialSlots={availableDate.slots}
        maxDate={maxDate}
        blockedDates={availableDate.blockedDates}
        duration={Number(duration)}
      />
    </Suspense>
  );
}
