import AvailabilityCalendar from '@/app/components/AvailabilityCalendar';
import BlockSlotForm from '@/app/components/BlockSlotForm';
import SetMaxBookingDateForm from '@/app/components/SetMaxBookingDateForm';
import StudioInfoForm from '@/app/components/StudioInfoForm';

import React from 'react';

export default function CalendarPage() {
  return (
    <>
      <div className="bg-mainLightColor rounded-3xl mb-10 shadow-lg">
        <SetMaxBookingDateForm />
      </div>
      <div className="bg-mainLightColor rounded-3xl mb-10 shadow-lg">
        <AvailabilityCalendar />
      </div>
      <div className="bg-mainLightColor rounded-3xl mb-10 shadow-lg">
        <BlockSlotForm />
      </div>
      <div className="bg-mainLightColor rounded-3xl mb-10 shadow-lg">
        <StudioInfoForm />
      </div>
    </>
  );
}
