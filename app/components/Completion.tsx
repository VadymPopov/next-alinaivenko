'use client';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { useRouter } from 'next/navigation';

import Text from './Text';
import Title from './Title';

export default function Completion() {
  const booking = true;

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] p-8 relative m-0">
      <button
        onClick={() => router.replace('/')}
        className="flex items-center absolute top-10 left-10 px-5 py-3 font-semibold text-xs uppercase border-[1px] border-accentColor transition-colors rounded-3xl cursor-pointer text-mainDarkColor bg-transparent hover:bg-accentColor hover:shadow-2xl hover:text-mainLightColor"
      >
        <MdOutlineArrowBackIos />
        Back
      </button>
      <Title>
        {booking
          ? 'Your appointment was successfully booked!'
          : 'Your payment was successfully made! '}
        <BsFillCheckCircleFill className="w-8 h-8 text-[green] ml-5" />
      </Title>

      <Text>
        {booking
          ? "Thank you for choosing my services. I look forward to our meeting! You will receive a booking confirmation by email. If you have any questions or need to make changes, please don't hesitate to contact me."
          : "Thank you for entrusting me with your vision. You will receive a payment confirmation by email. Looking forward to our next session,  where we'll bring your vision to life once more!"}
      </Text>
    </div>
  );
}
