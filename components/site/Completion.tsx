'use client';

import { Button, Text, Title } from '@/components/ui';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useRouter, useSearchParams } from 'next/navigation';

export function Completion() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] p-8 relative m-0">
      <Button
        styles="absolute top-10 left-10 px-5 py-3 text-xs"
        onClick={() => router.replace('/')}
      >
        <MdOutlineArrowBackIos />
        Back
      </Button>
      <div className="flex gap-4">
        {' '}
        <Title>
          {type === 'booking'
            ? 'Your appointment was successfully booked!'
            : 'Your payment was successfully made! '}
        </Title>
        <BsFillCheckCircleFill className="w-10 h-10 min-w-8 min-h-8 text-[green] inline-block" />
      </div>

      <Text>
        {type === 'booking'
          ? "Thank you for choosing my services. I look forward to our meeting! You will receive a booking confirmation by email. If you have any questions or need to make changes, please don't hesitate to contact me."
          : "Thank you for entrusting me with your vision. You will receive a payment confirmation by email. Looking forward to our next session,  where we'll bring your vision to life once more!"}
      </Text>

      <div className="absolute bottom-[-100px] h-4/5 m-auto">
        <DotLottieReact
          src="https://lottie.host/5ab0dd4b-ae64-44c1-b26e-f8e1367fdbb3/ZrfXEs4DuO.lottie"
          loop={false}
          autoplay
          mode="bounce"
          speed={1.5}
        />
      </div>
    </div>
  );
}
