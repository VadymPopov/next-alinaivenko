import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  calendar: React.ReactNode;
  stats: React.ReactNode;
  categories: React.ReactNode;
  countries: React.ReactNode;
  promotions: React.ReactNode;
}

export default function Layout({
  children,
  calendar,
  stats,
  //   sales,
  //   categories,
  //   countries,
  //   promotions,
}: LayoutProps) {
  return (
    <div>
      {children}
      <div>{stats}</div>
      <div>{calendar}</div>
      {/* <main className="grid grid-cols-12 gap-5 py-10 pl-10 pr-7">
        <div className="col-span-12">{stats}</div>
        <div className="col-span-5">{sales}</div>
        <div className="col-span-7">{categories}</div>
        <div className="col-span-6">{countries}</div>
        <div className="col-span-6">{promotions}</div>
      </main> */}
    </div>
  );
}
