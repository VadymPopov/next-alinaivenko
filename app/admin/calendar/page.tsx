import AvailabilityCalendar from '@/app/components/AvailabilityCalendar';
import BlockSlotForm from '@/app/components/BlockSlotForm';
import SetMaxBookingDateForm from '@/app/components/SetMaxBookingDateForm';
import StudioInfoForm from '@/app/components/StudioInfoForm';

import React from 'react';

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-mainLightColor rounded-3xl shadow-lg">
        <SetMaxBookingDateForm />
      </div>
      <div className="bg-mainLightColor rounded-3xl shadow-lg">
        <AvailabilityCalendar />
      </div>
      <div className="bg-mainLightColor rounded-3xl shadow-lg">
        <BlockSlotForm />
      </div>
      <div className="bg-mainLightColor rounded-3xl shadow-lg">
        <StudioInfoForm />
      </div>
    </div>
  );
}
