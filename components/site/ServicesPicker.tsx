'use client';

import Button from '@/components/ui/Button';
import { serviceType, useAppContext } from '@/providers/BookingFormContext';
import { getDepositBreakdown } from '@/utils/helpers';

import React, { useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const services = [
  {
    title: 'Small Tattoo',
    duration: '60 min',
    deposit: 'CA$100',
  },
  {
    title: 'Large Tattoo',
    duration: '120 min',
    deposit: 'CA$120',
  },
  {
    title: 'Permanent Makeup',
    duration: '60 min',
    deposit: 'CA$100',
  },
  {
    title: 'Touch-up',
    duration: '30 min',
    deposit: 'CA$20',
  },
];

export default function ServicesPicker() {
  const router = useRouter();
  const { service, setService, setAppointmentInfo } = useAppContext();
  const [selectedService, setSelectedService] = useState<serviceType | null>(
    service || null,
  );

  const isActive = (service: string) => selectedService === service;

  const handleCardClick = (value: serviceType) => {
    if (selectedService === value) {
      setSelectedService(null);
    } else {
      setSelectedService(value);
    }
  };

  const onBtnClick = () => {
    if (!selectedService) {
      return;
    }

    const { amount, tax, fee, total } = getDepositBreakdown(selectedService);

    setService(selectedService);
    setAppointmentInfo({ amount, tax, fee, total });
    router.push('/booking/client-info');
  };

  return (
    <div className="justify-center text-center">
      <h3 className="font-raleway font-semibold text-2xl leading-6 tracking-wide text-mainDarkColor text-left mb-5 sm:text-lg sm:leading-5">
        Choose a service:
      </h3>

      <ul className="lg:flex lg:mb-10 lg:items-center lg:justify-center mb-5 sm:grid sm:grid-cols-[170px_150px] md:grid-cols-[200px_200px] md:gap-7 sm:gap-5 sm:mx-auto sm:mb-7 sm:justify-center grid grid-cols-[140px_140px] gap-2.5 justify-center">
        {services.map(({ title, deposit, duration }) => {
          return (
            <li
              key={title}
              className={clsx(
                'flex flex-col items-end justify-between p-5 font-semibold text-sm leading-5 h-[140px] w-[140px] sm:h-[150px] sm:w-[170px] md:h-[160px] md:w-[200px] border rounded-2xl transition-colors duration-[250] ease-linear cursor-pointer hover:shadow-2xl hover:bg-accentColor hover:text-mainLightColor ',
                isActive(title)
                  ? 'bg-cardColor text-mainLightColor shadow-2xl'
                  : 'bg-mainLightColor text-cardColor',
                'border-accentColor',
              )}
              onClick={() => handleCardClick(title as serviceType)}
            >
              <p className="text-nowrap text-xs sm:text-base md:text-lg">
                {title}
              </p>
              <p className="text-textColorDarkBg text-xs sm:text-sm md:text-base">
                {duration}
              </p>
              <span className="flex justify-center items-center mt-10 gap-1 text-xs sm:text-sm">
                Deposit:{' '}
                <span className="inline-block  p-1 rounded text-mainDarkColor bg-bgColor  ">
                  {deposit}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center">
        <Button
          onClick={onBtnClick}
          style={{
            opacity: selectedService ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
