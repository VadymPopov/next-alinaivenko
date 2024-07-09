import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore wide range of services and transparent pricing. From Permanent Makeup of lips to Fine line tattoo. Discover the perfect solution for your needs and budget today.',
  openGraph: {
    title: 'Tattoo services',
    description:
      'Explore wide range of services and transparent pricing. From Permanent Makeup of lips to Fine line tattoo. Discover the perfect solution for your needs and budget today.',
    url: 'https://alinaivenko.com/services',
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

export default function Services() {
  return <div>Services</div>;
}
