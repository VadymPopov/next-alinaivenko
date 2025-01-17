import PaymentForm from '@/components/site/PaymentForm';

import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment',
  description:
    "Settle your remaining balance effortlessly with our secure payment page. Confirm your details, make your payment, and you're good to go. Thank you for choosing Alina Ivenko!",
  openGraph: {
    title: 'Tattoo payment',
    description:
      "Settle your remaining balance effortlessly with our secure payment page. Confirm your details, make your payment, and you're good to go. Thank you for choosing Alina Ivenko!",
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

export default function Payment() {
  return <PaymentForm />;
}
