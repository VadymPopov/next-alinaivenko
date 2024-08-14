import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import Section from '@/app/components/Section';
import Button from '@/app/components/Button';
import Title from '@/app/components/Title';
import Text from '@/app/components/Text';
import Link from 'next/link';

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
  // const router = useRouter();
  return (
    <Section>
      <ul>
        <li className="mb-0 flex flex-col-reverse p-5 lg:mb-7 lg:flex-row">
          <div className="mr-0 mt-5 block rounded-md border-2 border-accentColor bg-cardColor p-2.5 text-center text-mainLightColor sm:flex lg:mr-12 lg:block">
            <Image
              src="/images/small-tattoo.jpg"
              alt="small tattoo"
              className="max-w-full rounded-md sm:max-w-[320px]"
              width={260}
              height={400}
            />
            <div className="flex flex-1 flex-col items-center justify-center lg:block lg:text-center">
              <p className="mb-2.5 text-center text-2xl font-semibold text-textColorDarkBg">
                Small Tattoo
              </p>
              <p>Price range: CA$120-250</p>
              <p>Deposit: CA$100</p>
              <p>Size: up to 10 cm</p>
              <p>Duration: 1.2h</p>
            </div>
            <Button
              primary={true}
              // onClick={() => router.push('/booking', { state: 'small-tattoo' })}
            >
              Book now
            </Button>
          </div>

          <div>
            <Title>Small Tattoo</Title>
            <Text primary={true}>
              A small tattoo is a delicate and intimate form of body art. For
              instance, it can be a meaningful phrase written in the handwriting
              of a loved one or a paw print to commemorate a beloved pet. It
              could also be a flower symbolizing your birthdate. However, there
              are no limitations on choosing something adorable, like a heart,
              butterflies, or stars. After all, a small tattoo is your
              opportunity to express your creativity. These tattoos typically
              range from 1 to 10 cm in size, featuring minimal details and
              requiring a session duration of up to 80 minutes.
            </Text>
            <Text primary={true}>
              It&apos;s important to note that if a reservation is canceled with
              less than 48 hours&apos; notice, the deposit is non-refundable.{' '}
            </Text>
            <Text primary={true}>
              <b>
                The minimum price of a small tattoo is 120 CAD pre-tax, size 2-3
                cm.
              </b>{' '}
              Please{' '}
              <Link
                href="/contact"
                className="text-justify text-sm tracking-wide text-textColor underline sm:text-lg"
              >
                contact
              </Link>{' '}
              for more detailed information.
            </Text>
            <Text primary={true}>
              <b>Please note:</b> I do not offer finger tattoos, inner lip
              tattoos, or tattoos in intimate areas due to poor healing
              outcomes. Thank you for understanding.
            </Text>
          </div>
        </li>

        <li className="mb-0 flex flex-col-reverse p-5 lg:mb-7 lg:flex-row">
          <div className="mr-0 mt-5 block rounded-md border-2 border-accentColor bg-cardColor p-2.5 text-center text-mainLightColor sm:flex lg:mr-12 lg:block">
            <Image
              src="/images/large-tattoo.jpg"
              alt="large tattoo"
              className="max-w-full rounded-md sm:max-w-[320px]"
              width={260}
              height={400}
            />
            <div className="flex flex-1 flex-col items-center justify-center lg:block lg:text-center">
              <p className="mb-2.5 text-center text-2xl font-semibold text-textColorDarkBg">
                Large Tattoo
              </p>
              <p>Price: from CA$250 </p>
              <p>Deposit: CA$120</p>
              <p>Size: more than 10 cm and detailed</p>
              <p>Duration: 3h</p>
            </div>
            <Button
              primary={true}
              // onClick={() => router.push('/booking', { state: 'large-tattoo' })}
            >
              Book now
            </Button>
          </div>

          <div>
            <Title>Large Tattoo</Title>
            <Text>
              If you desire to elegantly emphasize your individuality, a large
              tattoo is the perfect choice. Compared to small tattoos, large
              ones provides more detail and can cover significant part of the
              body, as long as there is enough space available to accommodate
              the design. They are especially ideal for talismans, amulets, and
              enchanting tattoos that hold mystical significance. Given the
              complexity and scope, these tattoos may require multiple sessions
              spanning several days, as they demand both physical and spiritual
              preparation.
            </Text>
            <Text>
              It&apos;s important to note that if a reservation is canceled with
              less than 48 hours&apos; notice, the deposit is non-refundable.{' '}
            </Text>
            <Text primary={true}>
              <b>
                The minimum price of a large tattoo is 250 CAD pre-tax, size
                from 10 cm.
              </b>{' '}
              Please{' '}
              <Link
                href="/contact"
                className="text-justify text-sm tracking-wide text-textColor underline sm:text-lg"
              >
                contact
              </Link>{' '}
              for more detailed information.
            </Text>
          </div>
        </li>

        <li className="mb-0 flex flex-col-reverse p-5 lg:mb-7 lg:flex-row">
          <div className="mr-0 mt-5 block rounded-md border-2 border-accentColor bg-cardColor p-2.5 text-center text-mainLightColor sm:flex lg:mr-12 lg:block">
            <Image
              src="/images/touch-up.jpg"
              alt="Touch-up"
              className="max-w-full rounded-md sm:max-w-[320px]"
              width={260}
              height={400}
            />
            <div className="flex flex-1 flex-col items-center justify-center lg:block lg:text-center">
              <p className="mb-2.5 text-center text-2xl font-semibold text-textColorDarkBg">
                Touch-up
              </p>
              <p>Price: from CA$20 </p>
              <p>Deposit: CA$20</p>
              <p>Duration: 30min</p>
            </div>
            <Button
              primary={true}
              // onClick={() => router.push('/booking', { state: 'touch-up' })}
            >
              Book now
            </Button>
          </div>

          <div>
            <Title>Consultation/ Touch-up</Title>
            <Text primary={true}>
              The consultation process occurs online, where you will be required
              to describe your tattoo idea and share a relevant photo through
              Instagram. This initial step allows me to understand your vision
              and discuss the design possibilities before proceeding further.
              However, in unique situations, a personal meeting can be arranged,
              especially when the client wishes to create a custom and intricate
              design. For more information and an appointment for a
              consultation, please{' '}
              <Link
                className="text-justify text-sm tracking-wide text-textColor underline sm:text-lg"
                href="/contact"
              >
                contact
              </Link>
              .
            </Text>
            <Text>
              It&apos;s important to note that a separate fee is charged for
              tattoo correction (touch-up). Also, tattoo corrections are usually
              limited to work created by the original tattoo artist.
            </Text>
            <Text primary={true}>
              For more detailed information about the correction process and
              associated costs, it is best to consult directly.
            </Text>
          </div>
        </li>

        <li className="mb-0 flex flex-col-reverse p-5 lg:mb-7 lg:flex-row">
          <div className="mr-0 mt-5 block rounded-md border-2 border-accentColor bg-cardColor p-2.5 text-center text-mainLightColor sm:flex lg:mr-12 lg:block">
            <Image
              src="/images/permanent.jpg"
              alt="Permanent"
              className="max-w-full rounded-md sm:max-w-[320px]"
              width={260}
              height={400}
            />
            <div className="flex flex-1 flex-col items-center justify-center lg:block lg:text-center">
              <p className="mb-2.5 text-center text-2xl font-semibold text-textColorDarkBg">
                Permanent
              </p>
              <p>Deposit: CA$100</p>
              <p>Price is fixed CA$300</p>
              <p>Duration: 1h-3h</p>
            </div>
            <Button
              primary={true}
              // onClick={() => router.push('/booking', { state: 'permanent' })}
            >
              Book now
            </Button>
          </div>

          <div>
            <Title>Permanent</Title>
            <Text>
              Permanent makeup offers a selection of three procedures: eyebrows,
              eyelash, or lips tattooing. These procedures can be performed
              individually or combined according to your preferences. By opting
              for cosmetic tattooing, you can significantly reduce the time
              spent on your morning makeup routine, ensuring that you are always
              prepared and ready to go. During the procedure, organic mineral
              pigments are utilized, which provide long-lasting effects for up
              to two years. It can be repeated annually to maintain the desired
              results. This option is particularly suitable for individuals with
              busy schedules and heightened sensitivity to traditional
              cosmetics. It&apos;s important to note that occasionally, about a
              month after the procedure, a correction may be needed since the
              treatment involves the face and the pigment is injected into the
              upper layers of the skin, specifically the epidermis.
            </Text>
            <Text>
              Eyebrows tattooing aims to emphasize the natural shape of your
              face, eliminating the need for daily touch-ups and creating a
              natural and effortless look.
            </Text>
            <Text>
              Lips tattooing visually enhances the size of the lips and evens
              out their shade, providing a harmonious and long-lasting result.
            </Text>
            <Text>
              Eyelash tattooing focuses on creating a subtle line between the
              eyelashes, without extending it into a full eyeliner wing. This
              technique enhances the expressiveness of your eyes and gives the
              appearance of thicker lashes.
            </Text>
          </div>
        </li>
      </ul>
    </Section>
  );
}
