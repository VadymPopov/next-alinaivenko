'use client';

import CheckoutStripeForm from '@/app/components/CheckoutStripeForm';
import SkeletonBox from '@/app/components/SkeletonBox';
import { useAppContext } from '@/app/providers/BookingFormContext';

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

      const res = await fetch('/api/create-payment-intent?type=booking', {
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
    return (
      <div className="flex justify-center mt-5">
        <SkeletonBox className="w-[300px] h-[730px] rounded-[20px] mb-[20px] sm:w-[390px] lg:w-[470px]" />
      </div>
    );
  } else {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutStripeForm
          body={appointmentInfo!}
          isBooking={true}
          service={service}
        />
      </Elements>
    );
  }
}
