import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aftercare',
  description:
    'Discover essential tattoo aftercare tips and guidelines. Aftercare instructions will help you ensure the longevity and vibrancy of your new ink. Learn how to care for your tattoo properly and keep it looking its best for years to come',
  openGraph: {
    title: 'Tattoo Aftercare',
    description:
      'Discover essential tattoo aftercare tips and guidelines. Aftercare instructions will help you ensure the longevity and vibrancy of your new ink. Learn how to care for your tattoo properly and keep it looking its best for years to come',
    url: 'https://alinaivenko.com/aftercare',
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

export default function Aftercare() {
  return <div>Aftercare</div>;
}
