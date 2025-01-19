import { Button, Section, Suptitle, Text, Title } from '@/components/ui';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Your favorite Tattoo and Permanent Makeup Artist in Toronto.',
  openGraph: {
    title: 'Home',
    description: 'Your favorite Tattoo and Permanent Makeup Artist in Toronto.',
    url: 'https://alinaivenko.com/',
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

export default function Home() {
  return (
    <>
      <section className="hero-section relative overflow-hidden bg-cardColor px-5 py-[190px]">
        <div className="relative z-50">
          <Suptitle>Your favorite tattoo artist</Suptitle>
          <h1 className="mb-5 font-raleway text-7xl font-extrabold leading-tight tracking-wider text-mainLightColor">
            Ivenko Alina
          </h1>
          <p className="w-[300px] text-xl font-normal text-textColorDarkBg">
            Embrace the art of transformation. Don&apos;t hesitate, schedule
            your tattoo appointment right now.
          </p>
        </div>
      </section>
      <Section primary={true}>
        <div className="block items-start md:flex">
          <ul className="flex sm:justify-evenly sm:last:mr-0">
            <li className="mr-8">
              <Image
                src="/images/about-me-one.jpg"
                alt="about-me-one"
                width={270}
                height={270}
              />
            </li>
            <li className="md:hidden lg:mr-8 lg:inline-block">
              <Image
                src="/images/about-me-two.jpg"
                alt="about-me-two"
                width={270}
                height={270}
              />
            </li>
          </ul>
          <div className="flex flex-1 flex-col text-left">
            <Suptitle primary={true}>About me</Suptitle>
            <Title>Your favorite tattoo artist</Title>
            <Text primary={true} main={true}>
              You have chosen a tattoo artist who goes beyond the ordinary. By
              coming here, you are stepping into a world of transformation and
              artistic magic. I am about energy, change and a new way. On this
              site you can explore my portfolio and schedule the most convenient
              time for our meeting. Welcome! With each step, you are drawing
              closer to embracing a new reality tailored specifically for you.
            </Text>
            <Button>
              <Link href={'/booking'}>Online-Booking</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
