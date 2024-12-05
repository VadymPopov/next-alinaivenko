import React from 'react';

export interface StatCardProps {
  label: string;
  counter: number;
}

export default function StatCard({ label, counter }: StatCardProps) {
  return (
    <div className="rounded p-7 text-left bg-gradient-to-b from-mainDarkColor from-10%  to-cardColor to-80% text-mainLightColor">
      <p className="text-left before:w-4 before:h-0.5 before:rounded text-xs mb-5 before:inline-block before:mr-2 before:align-middle before:bg-textColorDarkBg">
        {label}
      </p>
      <p className="text-6xl font-semibold">{counter}</p>
    </div>
  );
}
