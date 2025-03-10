import { ErrorDisplay, ScheduleForm } from '@/components/site';
import { Loader } from '@/components/ui';
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

  if (!availableDate || !maxDate) {
    return (
      <ErrorDisplay
        className="bg-bgColor text-mainDarkColor p-6 rounded-lg border-2 border-dashed border-textColorDarkBg text-center max-w-md mx-auto shadow-md"
        prefixMsg="Meow?! 🐾"
        mainMsg="Looks like schedule data
        is on a little adventure. Let's see if we can catch it!"
        src="https://lottie.host/0f2e9d96-3f9f-47c7-836d-9e55f15fba91/EbphYedRgH.lottie"
        mode="bounce"
      />
    );
  }

  return (
    <Suspense fallback={<Loader />}>
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
