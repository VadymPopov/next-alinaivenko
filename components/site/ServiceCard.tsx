'use client';

import { slideFrom } from '@/animations';
import { Button } from '@/components/ui';
import { useAppContext } from '@/providers/AppContext';
import { serviceType } from '@/types';

import React from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ServiceCardProps {
  imgURL: string;
  title: serviceType;
  price: string;
  deposit: string;
  size?: string;
  duration: string;
  direction: 'left' | 'right';
}

export function ServiceCard({
  imgURL,
  title,
  price,
  deposit,
  size,
  duration,
  direction,
}: ServiceCardProps) {
  const { setService } = useAppContext();

  const router = useRouter();

  const onBtnClick = (service: serviceType) => {
    setService(service);
    router.push('/booking');
  };
  return (
    <motion.div
      variants={slideFrom}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={{ x: direction === 'left' ? -100 : 100, delay: 0.3 }}
      className={clsx(
        'mr-0 mt-5 block rounded-md border-2 border-accentColor bg-cardColor p-2.5 text-center text-mainLightColor sm:flex  lg:block',
        direction === 'left' ? 'lg:mr-12' : 'lg:ml-12',
      )}
    >
      <Image
        src={imgURL}
        alt={title}
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
    </motion.div>
  );
}
