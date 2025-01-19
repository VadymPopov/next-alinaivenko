import {
  AvailabilityCalendar,
  BlockSlotForm,
  SetMaxBookingDateForm,
  StudioInfoForm,
} from '@/components/admin';
import { getBlockedDates, getMaxDate, getStudioInfo } from '@/services';

import React, { Suspense, use } from 'react';

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
