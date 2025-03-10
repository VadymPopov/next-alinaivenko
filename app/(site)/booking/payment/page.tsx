'use client';

import { CheckoutStripeForm, ErrorDisplay } from '@/components/site';
import { SkeletonBox } from '@/components/ui';
import { usePaymentIntent } from '@/hooks';
import { useAppContext } from '@/providers/AppContext';

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

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
  }, [service, router]);

  const { clientSecret, isLoading, isError } = usePaymentIntent({
    body: service && appointmentInfo ? { service, ...appointmentInfo } : null,
    endpoint: '/api/create-payment-intent?type=booking',
  });

  useEffect(() => {
    if (isError) {
      toast.error('Stripe mounting error');
    }
  }, [isError]);

  if (isLoading || !stripePromise || !clientSecret) {
    return (
      <div className="flex justify-center mt-5">
        <SkeletonBox className="w-[300px] h-[730px] rounded-[20px] mb-[20px] sm:w-[390px] lg:w-[470px]" />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorDisplay
        className="text-center font-semibold mt-4"
        prefixMsg="Meow-sterious!"
        mainMsg="🐱 Payment isn't accessible right now—maybe it's hiding under the couch?  Let's give it another shot!"
        src="https://lottie.host/6cc3a64a-f962-49f2-9408-bc45ac3b4e69/WKh1SFzJTa.lottie"
        mode="bounce"
        speed={0.5}
      />
    );
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
