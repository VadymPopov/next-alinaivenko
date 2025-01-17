import Completion from '@/components/site/Completion';

import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Succeeded',
  description:
    "Pay easily on our secure payment page. Confirm your details, make your payment, and you're all set. Thank you for trusting me as your tattoo artist!",
  openGraph: {
    title: 'Tattoo payment',
    description:
      "Pay easily on our secure payment page. Confirm your details, make your payment, and you're all set. Thank you for trusting me as your tattoo artist!",
    url: 'https://alinaivenko.com/payment',
    siteName: 'alinaivenko.com',
    images: [
      {
        url: 'https://alinaivenko.com/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function PaymentSucceeded() {
  return <Completion />;
}
