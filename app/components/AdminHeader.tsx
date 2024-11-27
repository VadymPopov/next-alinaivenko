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
    <header className="fixed top-0 left-64 right-0 h-16 flex items-center gap-5 py-2.5 px-10 shadow-lg bg-gradient-to-r from-textColorDarkBg from-10%  to-bgColor to-80% z-50">
      <h1 className="flex-1 text-3xl font-semibld  text-mainLightColor">
        {pageName}
      </h1>
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
