'use client';

import Button from '@/components/ui/Button';
import { serviceType, useAppContext } from '@/providers/BookingFormContext';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface IServiceCard {
  imgURL: string;
  title: serviceType;
  price: string;
  deposit: string;
  size?: string;
  duration: string;
}

export default function ServiceCard({
  imgURL,
  title,
  price,
  deposit,
  size,
  duration,
}: IServiceCard) {
  const { setService } = useAppContext();

  const router = useRouter();

  const onBtnClick = (service: serviceType) => {
    setService(service);
    router.push('/booking');
  };
  return (
    <div className="mr-0 mt-5 block rounded-md border-2 border-accentColor bg-cardColor p-2.5 text-center text-mainLightColor sm:flex lg:mr-12 lg:block ">
      <Image
        src={imgURL}
        alt="small tattoo"
        className="w-full h-[450px] rounded-md sm:min-w-[320px] sm:max-w-[320px]  object-cover"
        width={260}
        height={400}
      />
      <div className="flex flex-1 flex-col items-center justify-center lg:block lg:text-center p-2.5">
        <p className="mb-2.5 text-center text-2xl font-semibold text-textColorDarkBg">
          {title}
        </p>
        <div className="text-start mb-2.5">
          <p>Price range: {price}</p>
          <p>Deposit: {deposit}</p>
          {size && <p>Size: {size}</p>}
          <p>Duration: {duration}</p>
        </div>
        <div className="flex justify-center">
          <Button primary={true} onClick={() => onBtnClick(title)}>
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
}
