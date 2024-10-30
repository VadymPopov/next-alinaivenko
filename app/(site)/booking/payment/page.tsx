'use client';

import { useAppContext } from '@/app/context/useGlobalState';

// import React, { useEffect } from 'react';

// import { useRouter } from 'next/navigation';

export default function BookingPayment() {
  const { service, appointmentInfo } = useAppContext();
  // const router = useRouter();

  if (appointmentInfo) {
    appointmentInfo.address = '123 St.Clair Street';
  }

  const onSubmit = async () => {
    const res = await fetch('/api/appointments/67214085c309bcb8e2e87b42', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ ...appointmentInfo, service }),
    });

    const data = await res.json();
    console.log(data);
  };

  // useEffect(() => {
  //   if (!service) {
  //     router.replace('/booking/service');
  //   }

  //   if (appointmentInfo) {
  //     //   appointmentInfo.address = checkDay(date);
  //     appointmentInfo.address =
  //       '689 St. Clair Avenue West, Toronto, Ontario M6C 1B2, Canada';
  //   }
  // });

  // return <div>Payment system is here</div>;
  return (
    <>
      <p>Payment</p>
      <button onClick={onSubmit}>Submit</button>
    </>
  );
}
