import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import Title from '@/components/ui/Title';

import React from 'react';

import { Metadata } from 'next';
import Link from 'next/link';

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
  return (
    <Section primary={true}>
      <Title>Tattoo FAQ&apos;s</Title>
      <ul className="block list-none grid-cols-3 gap-2.5 p-0 lg:grid">
        <li className="p-2.5">
          <p className="mb-5 font-raleway text-2xl font-bold tracking-wider text-mainDarkColor">
            How can I book an appoinment?
          </p>
          <Text primary={true} main={true}>
            To schedule an appointment, simply visit the{' '}
            <Link
              href="/booking"
              className="text-justify text-sm tracking-wide text-textColor underline sm:text-lg"
            >
              booking
            </Link>{' '}
            page and follow the easy steps to select a suitable date and time.
            For your convenience, I also accept same-day appointments, provided
            you already have your design ready. Let&apos;s get started and make
            your appointment today! Let the magic begin!
          </Text>

          <p className="mb-5 font-raleway text-2xl font-bold tracking-wider text-mainDarkColor">
            Should I prepare for getting a tattoo?
          </p>
          <Text primary={true}>
            Prior to your appointment, please refrain from consuming alcohol.
            Ensure that you eat and hydrate adequately beforehand. Avoid
            applying lotions to your skin, as we prefer clean, dry skin for the
            best tattooing experience.
          </Text>
        </li>

        <li className="p-2.5">
          <p className="mb-5 font-raleway text-2xl font-bold tracking-wider text-mainDarkColor">
            How do I take the first steps to turn my idea into a reality?
          </p>
          <Text primary={true}>
            To begin, take some time to explore and research the tattoo styles
            that resonate with you. Collecting reference photos can be helpful
            in expressing your preferences to the tattoo artist. If you&apos;re
            excited about the idea of working together, let&apos;s make some
            magic happen! Head to the booking page, where you can choose a
            suitable time to schedule a free{' '}
            <Link
              href="/booking"
              className="text-justify text-sm tracking-wide text-textColor underline sm:text-lg"
            >
              consultation
            </Link>{' '}
            . During this consultation, I&apos;ll be more than happy to address
            any additional questions you may have about your new tattoo.
            Let&apos;s collaborate to bring your vision to life!
          </Text>
        </li>

        <li className="p-2.5">
          <p className="mb-5 font-raleway text-2xl font-bold tracking-wider text-mainDarkColor">
            How old do I have to be to get tattooed?
          </p>
          <Text primary={true}>
            To receive a tattoo in Toronto, individuals must be 18 years of age
            and present a valid government-issued photo ID. However, exceptions
            can be made for customers as young as 16 years old with signed
            parental consent. In such cases, the parents or legal guardian must
            accompany the minor and provide their own government-issued ID along
            with an additional one for the minor. If the signee is a legal
            guardian, proof of guardianship through legal documentation is
            required. Once the necessary{' '}
            <Link
              href="/waiverform"
              className="text-justify text-sm tracking-wide text-textColor underline sm:text-lg"
            >
              waiver
            </Link>{' '}
            form is completed, the parent or guardian does not need to be
            present at the time of the tattoo procedure. Please note that only a
            parent or legal guardian can act as a signee for a minor; signed
            notes or phone calls from other relatives or friends will not be
            accepted in these cases.
          </Text>
        </li>

        <li className="p-2.5">
          <p className="mb-5 font-raleway text-2xl font-bold tracking-wider text-mainDarkColor">
            Can I bring a friend or family member to my appointment?
          </p>
          <Text primary={true}>
            Please come to your appointment alone to respect the privacy of
            other artists and clients. However, exceptions will be made for
            those who require a guardian or personal assistance; just let me
            know in advance. I understand you, so don&apos;t hesitate to ask.
          </Text>
        </li>

        <li className="p-2.5">
          <p className="mb-5 font-raleway text-2xl font-bold tracking-wider text-mainDarkColor">
            How long will my tattoo last?
          </p>
          <Text primary={true}>
            The longevity of a tattoo varies depending on factors such as skin
            type, location, ink quality, and aftercare. Generally, tattoos are
            considered permanent, but they may fade slightly over time. With
            proper{' '}
            <Link
              href="/aftercare"
              className="text-justify text-sm tracking-wide text-textColor underline sm:text-lg"
            >
              care
            </Link>{' '}
            and sun protection, a well-done tattoo can last for many years.
            However, some fading is natural over the long term.
          </Text>
        </li>

        <li className="p-2.5">
          <p className="mb-5 font-raleway text-2xl font-bold tracking-wider text-mainDarkColor">
            What is the cancellation policy?
          </p>
          <Text primary={true}>
            Our cancellation policy emphasizes that the tattoo deposit is
            non-refundable. If you wish to reschedule your appointment, we
            kindly request at least 1 week&apos;s notice. Failing to provide
            adequate notice will require purchasing a new deposit for the
            rescheduled appointment. We appreciate your understanding and
            respect for others&apos; time, as someone else could have booked the
            slot you initially reserved.
          </Text>
        </li>
        <li className="p-2.5">
          <p className="mb-5 font-raleway text-2xl font-bold tracking-wider text-mainDarkColor">
            Do you do finger tattoos or inner lip tattoos?
          </p>
          <Text primary={true}>
            I&apos;m sorry, but I don&apos;t offer finger tattoos, inner lip
            tattoos, or tattoos in intimate areas. These locations tend to have
            poor healing outcomes. Finger tattoos often fade or spread due to
            the constant movement and wear of the skin. Inner lip tattoos face
            similar challenges because the tissue is constantly rubbing against
            teeth and remains wet. For these reasons, I do not provide tattoos
            in these areas.
          </Text>
        </li>
      </ul>
    </Section>
  );
}
