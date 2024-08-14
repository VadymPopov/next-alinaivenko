import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FiMapPin, FiMail } from 'react-icons/fi';
import { TfiTime } from 'react-icons/tfi';
import { SiInstagram } from 'react-icons/si';
import Section from '@/app/components/Section';
import Title from '@/app/components/Title';
import EmbeddedMap from '@/app/components/EmbeddedMap';

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
  return (
    <Section primary={true}>
      <Title>Contact me</Title>
      <div className="block lg:flex">
        <div className="flex-1">
          <div className="mb-2.5 flex items-center font-medium">
            <p className="text-justify text-lg tracking-wide text-textColor">
              Toronto
            </p>
          </div>

          <div className="mb-2.5 flex items-center font-medium">
            <p className="text-justify text-lg tracking-wide text-textColor">
              Lara Jade Beauty
            </p>
          </div>

          <div className="mb-2.5 flex items-center font-medium">
            <FiMapPin className="mr-2.5 text-3xl text-accentColor" />
            <p className="text-justify text-lg tracking-wide text-textColor">
              689 St Clair Ave W 2nd Floor, Toronto, ON M6C 1B2
            </p>
          </div>
          <div className="flex-1">
            <EmbeddedMap
              latitude="43.682014043129215"
              longitude="-79.42608935396728"
              query="Lara+Jade+Beauty+StClair+Toronto"
            />
          </div>
          <br />

          <div className="mb-2.5 flex items-center font-medium">
            <FiMail className="mr-2.5 text-3xl text-accentColor" />
            <Link
              href="mailto:InkedbyAlina@gmail.com"
              className="list-none text-justify text-lg tracking-wide text-accentColor"
            >
              Email me
            </Link>
          </div>

          <div className="mb-2.5 flex items-center font-medium">
            <TfiTime className="mr-2.5 text-3xl text-accentColor" />
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
