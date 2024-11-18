'use client';

import React from 'react';
import { FaCat } from 'react-icons/fa';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const pageName = capitalizeFirstLetter(pathname.split('/')[2] || 'admin');

  return (
    <header className="flex items-center gap-5 py-6	px-10 border-b border-textColor ml-60">
      <h1 className="flex-1 text-3xl font-semibold  ">{pageName}</h1>
      <div className="w-px self-stretch bg-textColor" />
      <div className="flex gap-3">
        <FaCat size={36} />
        <div>
          <p className="text-base	font-semibold text-textColor">Gatita</p>
          <p className="text-sm	font-light text-textColor">
            ali.ivenko@gmail.com
          </p>
        </div>
      </div>
    </header>
  );
}
