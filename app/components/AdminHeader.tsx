'use client';

import React from 'react';

import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { useMenu } from '../hooks/useMenu';
import { useSidebar } from '../providers/SidebarContext';
import { getProfileInfo } from '../utils/getProfileInfo';
import { capitalizeFirstLetter } from '../utils/helpers';
import BurgerBtn from './BurgerBtn';
import Menu from './Menu';
import SignOutBtn from './SignOutBtn';
import SlidingMenu from './SlidingMenu';

const menu = [
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
  },
  {
    path: '/admin/appointments',
    label: 'Appointments',
  },
  {
    path: '/admin/calendar',
    label: 'Calendar',
  },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { profileImageURL } = getProfileInfo(session);
  const { isExtended } = useSidebar();
  const { isOpen, toggleMenu } = useMenu();
  const pageName = capitalizeFirstLetter(pathname.split('/')[2] || 'admin');

  return (
    <header
      className={clsx(
        isExtended ? 'md:left-64' : 'md:left-16',
        'fixed z-50 top-0 right-0 left-0 h-16 flex items-center gap-2.5 md:gap-5 py-2 px-5 md:py-2.5 md:px-10 shadow-lg bg-cardColor md:bg-gradient-to-r from-textColorDarkBg from-10%  to-bgColor to-80% transition-all',
      )}
    >
      <BurgerBtn
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="sliding-menu"
      />
      <SlidingMenu
        isOpen={isOpen}
        position="left"
        className={clsx(
          'fixed top-0 w-screen',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Menu onClick={toggleMenu} menu={menu} />
      </SlidingMenu>

      <h1 className="flex-1 text-xl sm:text-2xl md:text-3xl font-semibld text-mainLightColor">
        {pageName}
      </h1>
      <div className="w-px self-stretch bg-mainLightColor md:bg-textColor" />

      <div className="flex gap-1 md:gap-3">
        <Image
          className="rounded-full h-10 w-10 cursor-pointer"
          alt="profile picture"
          src={profileImageURL}
          width={40}
          height={40}
          onClick={() => router.push('/admin/profile', { scroll: false })}
        />
        <div className="hidden md:block">
          <p className="text-base	font-semibold text-textColor">
            {session?.user?.role}
          </p>
          <p className="text-sm	font-light text-textColor">
            {session?.user?.email}
          </p>
        </div>
        <div className="md:hidden block">
          <SignOutBtn />
        </div>
      </div>
    </header>
  );
}
