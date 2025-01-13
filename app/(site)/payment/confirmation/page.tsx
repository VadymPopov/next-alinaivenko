'use client';

import CheckoutStripeForm from '@/app/components/CheckoutStripeForm';
import SkeletonBox from '@/app/components/SkeletonBox';
import { usePaymentIntent } from '@/app/hooks/usePaymentIntent';
import { useAppContext } from '@/app/providers/BookingFormContext';

import React, { useEffect } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function PostPayment() {
  const { paymentInfo } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!paymentInfo?.amount) {
      router.replace('/payment');
    }
  });

  const { clientSecret, isLoading, error } = usePaymentIntent({
    body: paymentInfo
      ? {
          name: paymentInfo?.name,
          email: paymentInfo?.email,
          total: paymentInfo?.total,
        }
      : null,
    endpoint: '/api/create-payment-intent',
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
      <CheckoutStripeForm body={paymentInfo!} isBooking={false} />
    </Elements>
  );
}
