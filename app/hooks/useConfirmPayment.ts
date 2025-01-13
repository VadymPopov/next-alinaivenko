import { useState } from 'react';

import { PaymentIntentResult, Stripe, StripeElements } from '@stripe/stripe-js';

import {
  IAppointmentInfo,
  IPaymentInfo,
  serviceType,
} from '../providers/BookingFormContext';

interface UseConfirmPaymentProps {
  isBooking: boolean;
  body: IAppointmentInfo | IPaymentInfo;
  service?: serviceType | null;
}

export function useConfirmPayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  const confirmPayment = async (
    stripe: Stripe | null,
    elements: StripeElements | null,
    { isBooking, body, service }: UseConfirmPaymentProps,
  ): Promise<{ success: boolean }> => {
    if (!stripe || !elements) {
      setMessage('Stripe is not initialized.');
      return { success: false };
    }

    setIsProcessing(true);
    setMessage(undefined);

    try {
      const { error, paymentIntent }: PaymentIntentResult =
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}`,
          },
          redirect: 'if_required',
        });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message);
        } else {
          setMessage('Unexpected error occurred.');
        }
        return { success: false };
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        await fetch(
          isBooking ? '/api/appointments' : '/api/payment-confirmation',
          {
            method: isBooking ? 'POST' : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...body,
              service,
              paymentIntentId: paymentIntent.id,
            }),
          },
        );
        return { success: true };
      } else {
        setMessage('Payment not completed. Please try again.');
        return { success: false };
      }
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred.',
      );
      return { success: false };
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, message, confirmPayment };
}
