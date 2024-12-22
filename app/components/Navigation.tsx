'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { useMenu } from '../hooks/useMenu';
import BurgerBtn from './BurgerBtn';
import Menu from './Menu';
import SlidingMenu from './SlidingMenu';

const menu = [
  {
    path: '/portfolio',
    label: 'Portfolio',
  },
  {
    path: '/services',
    label: 'Services and Prices',
  },
  {
    path: '/aftercare',
    label: 'Aftercare',
  },
  {
    path: '/waiverform',
    label: 'Waiver',
  },
  {
    path: '/booking',
    label: 'Booking',
  },
  {
    path: '/faq',
    label: 'FAQ',
  },
  {
    path: '/contact',
    label: 'Contact',
  },
  {
    path: '/payment',
    label: 'Payment',
  },
];

export default function Navigation() {
  const { onClose, isOpen, toggleMenu } = useMenu();

  return (
    <header
      className={clsx(
        'fixed top-0 z-[100] w-full overflow-hidden border-b-[1px] border-b-cardColor px-4 py-3 lg:px-5 lg:py-4 xl:px-6 xl:py-5 lg:bg-mainLightColor bg-cardColor',
      )}
    >
      <nav>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            className="font inline-block rounded-lg font-bold no-underline"
          >
            <Image
              src="/logo-circle.svg"
              alt="logo"
              width="64"
              height="64"
              className="max-h-16 max-w-16 rounded-full"
            />
          </Link>
          <div className="hidden lg:flex">
            <Menu menu={menu} />
          </div>
          <BurgerBtn
            isOpen={isOpen}
            toggleMenu={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="sliding-menu"
          />
        </div>
        <SlidingMenu
          isOpen={isOpen}
          className={isOpen ? 'opacity-100' : 'opacity-0 fixed'}
        >
          <Menu onClick={toggleMenu} menu={menu} />
        </SlidingMenu>
      </nav>
    </header>
  );
}
