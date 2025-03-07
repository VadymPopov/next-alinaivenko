'use client';

import { BurgerBtn, Menu, SlidingMenu } from '@/components/ui';
import { SITE_MENU } from '@/constants';
import { useMenu } from '@/hooks';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export function Navigation() {
  const { onClose, isOpen, toggleMenu } = useMenu();

  return (
    <header
      className={clsx(
        'fixed top-0 z-[100] w-full overflow-hidden px-4 py-3 lg:px-5 lg:py-4 xl:px-6 xl:py-5 lg:bg-mainLightColor bg-cardColor shadow-lg',
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
            <Menu menu={SITE_MENU} />
          </div>
          <BurgerBtn isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
        <SlidingMenu
          isOpen={isOpen}
          className={isOpen ? 'opacity-100' : 'opacity-0 fixed'}
        >
          <Menu onClick={toggleMenu} menu={SITE_MENU} />
        </SlidingMenu>
      </nav>
    </header>
  );
}
