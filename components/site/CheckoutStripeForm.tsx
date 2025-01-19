'use client';

import Button from '@/components/ui/Button';
import { useConfirmPayment } from '@/hooks/useConfirmPayment';
import { AppointmentInfo, PaymentInfo, serviceType } from '@/types';
import { formatCurrency } from '@/utils/helpers';

import React, { FormEvent } from 'react';

import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

interface AppointmentCheckoutProps {
  isBooking: true;
  body: AppointmentInfo;
  service?: serviceType | null;
}

interface PaymentCheckoutProps {
  isBooking: false;
  body: PaymentInfo;
  service?: never;
}

export default function CheckoutStripeForm({
  isBooking,
  body,
  service,
}: AppointmentCheckoutProps | PaymentCheckoutProps) {
  const { isProcessing, message, confirmPayment } = useConfirmPayment();
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { success } = await confirmPayment(stripe, elements, {
      isBooking,
      body,
      service,
    });

    if (success) {
      router.replace(
        isBooking ? '/payment-succeeded?type=booking' : '/payment-succeeded',
      );
    }
  };

  return (
    <form
      className="flex justify-center"
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <div className="md:w-[470px] py-2.5 px-8 flex flex-col justify-between border border-textColorDarkBg shadow-md  rounded-lg bg-bgColor w-auto">
        <div className="w-full border-b border-mainDarkColor flex flex-col items-baseline my-4">
          <h3 className="text-lg font-semibold mb-4 tracking-wider">
            {isBooking ? 'Service Details' : 'Your Order'}
          </h3>
          <p className="text-base mb-3 tracking-wider">
            {isBooking
              ? `${service} Appointment Deposit`
              : 'Tattoo service payment'}
          </p>
          {isBooking && (
            <p className="text-base mb-3 tracking-wider">
              {format(body.date as Date, 'MMMM dd, yyyy')} at {body.slot}
            </p>
          )}
        </div>

        <div className="w-full text-start">
          <h3 className="text-lg font-semibold mb-4 tracking-wider">
            Payment Details
          </h3>
          <div className="w-full border-b border-mainDarkColor flex flex-col my-4">
            <div className="flex justify-between">
              <p className="text-base mb-3 tracking-wider">Subtotal</p>
              <p className="text-base mb-3 tracking-wider">
                {formatCurrency(body.amount as number)}
              </p>
            </div>
            {!isBooking && (
              <div className="flex justify-between">
                <p className="text-base mb-3 tracking-wider">Tips</p>
                <p className="text-base mb-3 tracking-wider">
                  {formatCurrency((body as PaymentInfo).tip as number)}
                </p>
              </div>
            )}
            <div className="flex justify-between">
              <p className="text-base mb-3 tracking-wider">Tax (GST/HST)</p>
              <p className="text-base mb-3 tracking-wider">
                {formatCurrency(body.tax as number)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-base mb-3 tracking-wider">Processing Fee</p>
              <p className="text-base mb-3 tracking-wider">
                {formatCurrency(body.fee as number)}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-base mb-3 tracking-wider">Total</p>
            <p className="text-base mb-3 tracking-wider">
              {formatCurrency(body.total as number)}
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
