'use client';

import CheckoutStripeForm from '@/app/components/CheckoutStripeForm';
import SkeletonForm from '@/app/components/Skeleton';
import { useAppContext } from '@/app/context/useGlobalState';

import React, { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function BookingPayment() {
  const [clientSecret, setClientSecret] = useState(null);
  const { service, appointmentInfo } = useAppContext();
  const router = useRouter();

  if (appointmentInfo) {
    appointmentInfo.address =
      '689 St. Clair Avenue West, Toronto, Ontario M6C 1B2, Canada';
  }

  useEffect(() => {
    if (!service) {
      router.replace('/booking/service');
    }
  });

  useEffect(() => {
    (async () => {
      if (!service) {
        return;
      }

      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: appointmentInfo?.name,
          email: appointmentInfo?.email,
          service,
        }),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
    })();
  }, [appointmentInfo?.email, appointmentInfo?.name, service]);

  if (!stripePromise || !clientSecret) {
    return <SkeletonForm />;
  } else {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutStripeForm />
      </Elements>
    );
  }
}
