'use client';

import React, { FormEvent, useState } from 'react';

import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';

import { useAppContext } from '../context/useGlobalState';
import { formatCurrency } from '../utils/helpers';
import {
  calculatePrice,
  calculateStripeFee,
  switchName,
} from '../utils/helpers';
import Button from './Button';

export default function CheckoutStripeForm() {
  const [message, setMessage] = useState<string | undefined>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { service, appointmentInfo } = useAppContext();
  const router = useRouter();
  const procedureName = switchName(service);

  const amount = calculatePrice(service) || 0;
  const tax = Number((amount * 0.13).toFixed(2)) || 0;
  const fee = calculateStripeFee(amount + tax);
  const total = Number((tax + amount + fee).toFixed(2));

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}`,
      },
      redirect: 'if_required',
    });

    if (
      (error && error.type === 'card_error') ||
      (error && error.type === 'validation_error')
    ) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...appointmentInfo,
          service,
          paymentIntentId: paymentIntent.id,
          deposit: {
            amount,
            tax,
            fee,
            total,
          },
        }),
      });
      router.replace('/payment-succeeded?type=booking');
    } else {
      setMessage('Unexpected state');
    }
    setIsProcessing(false);
  };

  return (
    <form
      className="flex justify-center"
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <div className="w-[470px] py-2.5 px-8 flex flex-col justify-between border border-textColorDarkBg shadow-md  rounded-lg bg-bgColor sm:w-auto">
        <div className="w-full border-b border-mainDarkColor flex flex-col items-baseline my-4">
          <h3 className="text-lg font-semibold mb-5 tracking-wider">
            Service Details
          </h3>
          <p className="text-base mb-4 tracking-wider">
            {procedureName} Appointment Deposit
          </p>
          <p className="text-base mb-4 tracking-wider">
            {appointmentInfo?.slot && appointmentInfo?.date}
            {appointmentInfo?.slot && <span>at {appointmentInfo?.slot}</span>}
          </p>
        </div>

        <div className="w-full text-start">
          <h3 className="text-lg font-semibold mb-5 tracking-wider">
            Payment Details
          </h3>
          <div className="w-full border-b border-mainDarkColor flex flex-col my-4">
            <div className="flex justify-between">
              <p className="text-base mb-4 tracking-wider">Subtotal</p>
              <p className="text-base mb-4 tracking-wider">
                {formatCurrency(amount)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-base mb-4 tracking-wider">Tax (GST/HST)</p>
              <p className="text-base mb-4 tracking-wider">
                {formatCurrency(tax)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-base mb-4 tracking-wider">Processing Fee</p>
              <p className="text-base mb-4 tracking-wider">
                {formatCurrency(fee)}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-base mb-4 tracking-wider">Total</p>
            <p className="text-base mb-4 tracking-wider">
              {formatCurrency(total)}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-5">
            <PaymentElement />
          </div>

          <Button
            type="submit"
            disabled={isProcessing || !stripe || !elements}
            isProcessing={isProcessing}
          >
            {isProcessing ? 'Processing' : 'Pay now'}
          </Button>
          {message && (
            <div
              className="mt-5 text-error text-center font-semibold"
              id="payment-message"
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
