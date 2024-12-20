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
      <main className="grid grid-cols-12 gap-5 py-4 px-10">
        <div className="col-span-12">{stats}</div>
        <div className="col-span-5 items-center justify-center flex bg-mainLightColor rounded-3xl mr-10 shadow-lg">
          {doughnut}
        </div>
        <div className="col-span-7 bg-mainLightColor rounded-3xl  shadow-lg py-8 px-10">
          {clients}
        </div>
        <div className="col-span-12">{calendar}</div>
      </main>
    </div>
  );
}
