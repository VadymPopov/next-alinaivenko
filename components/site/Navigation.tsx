'use client';

import { BurgerBtn, Menu, SlidingMenu } from '@/components/ui';
import { SITE_MENU } from '@/constants';
import { useMenu } from '@/hooks';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import throttle from 'lodash.throttle';
import Image from 'next/image';
import Link from 'next/link';

export function Navigation() {
  const { onClose, isOpen, toggleMenu } = useMenu();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY.current);
      lastScrollY.current = currentScrollY;
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={clsx(
        'z-[100] w-full overflow-hidden px-4 py-3 lg:px-5 lg:py-4 xl:px-6 xl:py-5 bg-cardColor shadow-lg transition-all duration-500 ease-in-out',
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
        'sticky top-0',
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
