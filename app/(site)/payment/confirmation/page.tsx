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

export default function PostPayment() {
  const [clientSecret, setClientSecret] = useState(null);
  const { paymentInfo } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!paymentInfo?.amount) {
      router.replace('/payment');
    }
  });

  useEffect(() => {
    (async () => {
      if (!paymentInfo?.amount) {
        return;
      }

      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: paymentInfo?.name,
          email: paymentInfo?.email,
          total: paymentInfo?.total,
        }),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
    })();
  }, [
    paymentInfo?.amount,
    paymentInfo?.email,
    paymentInfo?.name,
    paymentInfo?.total,
  ]);

  if (!stripePromise || !clientSecret) {
    return <SkeletonForm />;
  } else {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutStripeForm body={paymentInfo!} isBooking={false} />
      </Elements>
    );
  }
}
