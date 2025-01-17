import { formatCurrency } from '@/utils/helpers';

import React from 'react';

export interface StatCardProps {
  label: string;
  counter: number;
  isCurrency?: boolean;
}

export default function StatCard({
  label,
  counter,
  isCurrency,
}: StatCardProps) {
  return (
    <div className="flex flex-col gap-2.5 lg:gap-4 xl:gap-5 rounded p-2 md:p-4 lg:p-5 xl:p-7 text-left bg-gradient-to-b from-mainDarkColor from-10%  to-cardColor to-80% text-mainLightColor h-24 md:h-28 lg:h-32 xl:h-36 shadow-2xl">
      <span className=" text-left lg:before:w-4 before:w-2 before:h-0.5 before:rounded text-xs before:inline-block lg:before:mr-2 before:mr-1 before:align-middle before:bg-textColorDarkBg">
        {label}
      </span>
      <span className="sm:text-2xl xl:text-5xl lg:text-3xl font-semibold text-center sm:text-start">
        {isCurrency ? formatCurrency(counter) : counter}
      </span>
    </div>
  );
}
