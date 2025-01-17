import EmbeddedMap from '@/components/site/EmbeddedMap';
import Section from '@/components/ui/Section';
import Title from '@/components/ui/Title';

import React from 'react';
import {
  MdOutlineAccessTime,
  MdOutlineEmail,
  MdOutlinePinDrop,
} from 'react-icons/md';
import { SiInstagram } from 'react-icons/si';

import { Metadata } from 'next';
import Link from 'next/link';

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

export async function getStudioInfo() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/calendar/studio`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch studio information: ${response.statusText}`,
    );
  }
  return response.json();
}

export default async function Contact() {
  const studio = await getStudioInfo();
  const query = encodeURIComponent(`${studio?.name}, ${studio?.address}`);

  return (
    <Section primary={true}>
      <Title>Contact me</Title>
      <div className="block lg:flex">
        <div className="flex-1">
          <div className="mb-2.5 flex items-center font-medium">
            <p className="text-justify text-lg tracking-wide text-textColor">
              {studio.city}
            </p>
          </div>

          <div className="mb-2.5 flex items-center font-medium">
            <p className="text-justify text-lg tracking-wide text-textColor">
              {studio.name}
            </p>
          </div>

          <div className="mb-2.5 flex items-center font-medium">
            <MdOutlinePinDrop className="mr-2.5 text-3xl text-accentColor" />
            <p className="text-justify text-lg tracking-wide text-textColor">
              {studio.address}
            </p>
          </div>
          <div className="flex-1">
            <EmbeddedMap
              latitude={studio.latitude}
              longitude={studio.longitude}
              query={query}
            />
          </div>
          <br />

          <div className="mb-2.5 flex items-center font-medium">
            <MdOutlineEmail className="mr-2.5 text-3xl text-accentColor" />
            <Link
              href="mailto:InkedbyAlina@gmail.com"
              className="list-none text-justify text-lg tracking-wide text-accentColor"
            >
              Email me
            </Link>
          </div>

          <div className="mb-2.5 flex items-center font-medium">
            <MdOutlineAccessTime className="mr-2.5 text-3xl text-accentColor" />
            <p className="text-justify text-lg tracking-wide text-textColor">
              11AM - 8PM
            </p>
          </div>

          <div className="mb-2.5 flex items-center font-medium">
            <SiInstagram className="mr-2.5 text-3xl text-accentColor" />
            <Link
              href="https://www.instagram.com/ivenko.alinaaa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="instagram-page"
              className="list-none text-justify text-lg tracking-wide text-accentColor"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
