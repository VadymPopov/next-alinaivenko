import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  calendar: React.ReactNode;
  stats: React.ReactNode;
  clients: React.ReactNode;
  doughnut: React.ReactNode;
}

export default function Layout({
  children,
  calendar,
  stats,
  clients,
  doughnut,
}: LayoutProps) {
  return (
    <div>
      {children}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 sm:col-span-6 xl:col-span-12 ">{stats}</div>
        <div className="col-span-12 sm:col-span-6 xl:col-span-5 items-center justify-center flex bg-mainLightColor rounded-3xl shadow-lg py-2.5 px-4 md:py-4 md:px-8">
          {doughnut}
        </div>
        <div className="col-span-12 xl:col-span-7 bg-mainLightColor rounded-3xl  shadow-lg py-2.5 px-4 md:py-4 md:px-8">
          {clients}
        </div>
        <div className="col-span-12">{calendar}</div>
      </div>
    </div>
  );
}
