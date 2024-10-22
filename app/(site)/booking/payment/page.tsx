'use client';

import { useAppContext } from '@/app/context/useGlobalState';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

export default function BookingPayment() {
  const { service, appointmentInfo } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!service) {
      router.replace('/booking/service');
    }

    if (appointmentInfo) {
      //   appointmentInfo.address = checkDay(date);
      appointmentInfo.address =
        '689 St. Clair Avenue West, Toronto, Ontario M6C 1B2, Canada';
    }
  });

  return <div>Payment system is here</div>;
}
