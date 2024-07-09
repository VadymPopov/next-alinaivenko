import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Find answers to frequently asked questions about tattoo services, safety protocols, booking process, and aftercare. Get informed and feel confident about your tattoo experience with me.',
  openGraph: {
    title: 'Tattoo FAQ',
    description:
      'Find answers to frequently asked questions about tattoo services, safety protocols, booking process, and aftercare. Get informed and feel confident about your tattoo experience with me.',
    url: 'https://alinaivenko.com/faq',
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

export default function Faq() {
  return <div>Faq</div>;
}
