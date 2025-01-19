'use client';

import { Button, Text, Title } from '@/components/ui';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdOutlineArrowBackIos } from 'react-icons/md';

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
      <Title>
        {type === 'booking'
          ? 'Your appointment was successfully booked!'
          : 'Your payment was successfully made! '}
        <BsFillCheckCircleFill className="w-8 h-8 text-[green] ml-5" />
      </Title>

      <Text>
        {type === 'booking'
          ? "Thank you for choosing my services. I look forward to our meeting! You will receive a booking confirmation by email. If you have any questions or need to make changes, please don't hesitate to contact me."
          : "Thank you for entrusting me with your vision. You will receive a payment confirmation by email. Looking forward to our next session,  where we'll bring your vision to life once more!"}
      </Text>
    </div>
  );
}
