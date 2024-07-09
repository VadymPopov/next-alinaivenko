import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach out easily, and let me assist you promptly. Your communication matters to me!',
  openGraph: {
    title: 'Contact',
    description:
      'Reach out easily, and let me assist you promptly. Your communication matters to me!',
    url: 'https://alinaivenko.com/contact',
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

export default function Contact() {
  return <div>Contact</div>;
}
