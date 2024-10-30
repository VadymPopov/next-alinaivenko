'use client';

import { useEffect, useState } from 'react';
import { CgClose, CgMenu } from 'react-icons/cg';
import { useMedia } from 'react-use';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import Menu from './Menu';

export default function Navigation() {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMedia('(max-width: 1024px)');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={clsx(
        'fixed top-0 z-[100] w-full overflow-hidden border-b-[1px] border-b-cardColor px-4 py-3 lg:px-5 lg:py-4 xl:px-6 xl:py-5',
        isMounted && isMobile ? 'bg-cardColor' : 'bg-mainLightColor',
      )}
    >
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          onClick={isMobile ? onClose : undefined}
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
        {isMounted && isMobile ? (
          <button
            onClick={toggleMenu}
            className="text-white h-10 w-10 cursor-pointer border-none bg-transparent outline-none"
            aria-label="mobile-menu-toggle"
          >
            {isOpen ? (
              <CgClose style={{ color: 'white' }} className="h-8 w-8" />
            ) : (
              <CgMenu className="h-8 w-8" style={{ color: 'white' }} />
            )}
          </button>
        ) : (
          <Menu isMobile={isMobile} />
        )}
      </nav>
      {isMounted && (
        <div
          className={clsx(
            'right-0 z-50 flex h-screen items-center justify-center overflow-auto bg-cardColor px-5 py-10',
            !isOpen ? 'fixed opacity-0' : 'opacity-100',
          )}
          style={{
            transform: isOpen
              ? 'translate3d(0%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)'
              : 'translate3d(100%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
            transformStyle: 'preserve-3d',
            transition:
              'opacity 1s ease-in-out, transform 1s cubic-bezier(0.075, 0.82, 0.165, 1)',
          }}
        >
          <Menu onClick={toggleMenu} isMobile={isMobile} />
        </div>
      )}
    </header>
  );
}
