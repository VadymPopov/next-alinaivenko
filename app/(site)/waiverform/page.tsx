import WaiverForm from '@/components/site/WaiverForm/WaiverForm';
import Text from '@/components/ui/Text';
import Title from '@/components/ui/Title';

import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Waiverform/Conscent',
  description:
    'Waiver form is designed to protect both parties involved and outline the terms and conditions of your engagement with me. Ensure clarity, transparency, and legal compliance with the waiver document.',
  openGraph: {
    title: 'Tattoo Waiverform/Conscent',
    description:
      'Waiver form is designed to protect both parties involved and outline the terms and conditions of your engagement with me. Ensure clarity, transparency, and legal compliance with the waiver document.',
    url: 'https://alinaivenko.com/waiverform',
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

export default function Waiverform() {
  return (
    <>
      <div className="pt-5 px-8">
        <Title>
          {' '}
          Consent to application of Tattoo/ Permanent makeup and release and
          waiver of all claims
        </Title>
        <Text>
          IMPORTANT NOTICE: BY SIGNING THIS TATTOO WAIVER FORM, YOU ARE WAIVING
          IMPORTANT LEGAL RIGHTS. READ THIS DOCUMENT CAREFULLY AND SEEK LEGAL
          COUNSEL IF NECESSARY BEFORE SIGNING.
        </Text>
      </div>
      <WaiverForm />
    </>
  );
}
