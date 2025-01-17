import Services from '@/components/site/ServicesPicker';

import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking',
  description:
    'Secure your spot today with Alina Ivenko! The easy-to-use booking page makes it easy to schedule the desired service at a time convenient for you.  Reserve your appointment now and embark on your next adventure!',
  openGraph: {
    title: 'Tattoo Booking',
    description:
      'Secure your spot today with Alina Ivenko! The easy-to-use booking page makes it easy to schedule the desired service at a time convenient for you.  Reserve your appointment now and embark on your next adventure!',
    url: 'https://alinaivenko.com/booking',
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

export default function Booking() {
  return (
    <div>
      <Services />
    </div>
  );
}
