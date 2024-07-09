import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    "Explore Alina's stunning tattoo portfolio featuring a diverse collection of inked masterpieces.",
  openGraph: {
    title: 'Tattoo portfolio',
    description:
      "Explore Alina's stunning tattoo portfolio featuring a diverse collection of inked masterpieces.",
    url: 'https://alinaivenko.com/portfolio',
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

export default function Portfolio() {
  return <div>Portfolio</div>;
}
