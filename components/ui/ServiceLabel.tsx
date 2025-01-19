import { serviceType } from '@/types';

import React from 'react';

import clsx from 'clsx';

export interface ServiceLabelProps {
  service: serviceType;
}

export function ServiceLabel({ service }: ServiceLabelProps) {
  return (
    <div
      className={clsx(
        'inline-flex items-center py-1 px-2.5 sm:px-3.5 rounded-3xl  text-xs font-medium',
        service === 'Small Tattoo' && 'text-[#2D6A4F] bg-[#D8F3DC]',
        service === 'Large Tattoo' && 'text-[#A4161A] bg-[#FFD6D9]',
        service === 'Touch-up' && 'text-[#FF6700] bg-[#FFE5CC]',
        service === 'Permanent Makeup' && 'text-[#0077B6] bg-[#D0EFFF]',
      )}
    >
      {service}
    </div>
  );
}
