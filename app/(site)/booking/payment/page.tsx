'use client';

import { CheckoutStripeForm } from '@/components/site';
import { SkeletonBox } from '@/components/ui';
import { usePaymentIntent } from '@/hooks';
import { useAppContext } from '@/providers/AppContext';

import React, { useEffect } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function BookingPayment() {
  const { service, appointmentInfo } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!service) {
      router.replace('/booking');
    }
  });

  const { clientSecret, isLoading, error } = usePaymentIntent({
    body: service && appointmentInfo ? { service, ...appointmentInfo } : null,
    endpoint: '/api/create-payment-intent?type=booking',
  });

  if (isLoading || !stripePromise || !clientSecret) {
    return (
      <div className="flex justify-center mt-5">
        <SkeletonBox className="w-[300px] h-[730px] rounded-[20px] mb-[20px] sm:w-[390px] lg:w-[470px]" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
