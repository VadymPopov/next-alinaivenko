'use client';

import { SiInstagram, SiTiktok } from 'react-icons/si';
import { VscGithub } from 'react-icons/vsc';
import { VscGithubInverted } from 'react-icons/vsc';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  return (
    <footer
      className={clsx(
        pathname === '/waiverform' ? 'pb-[60px]' : ' py-3  lg:py-4  xl:py-5',
        'flex flex-col items-center justify-between border-t-[1px] border-t-cardColor  text-sm md:flex-row px-4 lg:px-5 xl:px-6',
      )}
    >
      <div className="order-3 flex items-center justify-center text-center md:order-1">
        <span className="text-base lg:text-lg">Developed by</span>
        <Link
          href="https://github.com/VadymPopov"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="frontend-developer-github"
          className="mt-1.5 inline-block p-1.5 sm:p-2.5"
        >
          <VscGithub className="h-5 w-5 text-mainDarkColor transition-colors hover:text-accentColor" />
        </Link>
        <span>&</span>
        <Link
          href="https://github.com/AnastasiiaKor"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="backend-developer-github"
          className="mt-1.5 inline-block p-1.5 sm:p-2.5"
        >
          <VscGithubInverted className="h-5 w-5 text-mainDarkColor transition-colors hover:text-accentColor" />
        </Link>
      </div>
      <span className="order-1 mb-4 text-base md:order-2 md:mb-0 lg:text-lg">
        &copy; 2023-{new Date().getFullYear()}, Alina Ivenko.
      </span>
      <div className="order-2 mb-4 flex md:order-3 md:mb-0">
        <Link
          href="https://www.tiktok.com/@ivenko.alinaaa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="tiktok-page"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-bgColor text-mainDarkColor no-underline transition-colors first:mr-7 hover:border-textColorDarkBg hover:bg-mainLightColor hover:text-accentColor"
        >
          <SiTiktok />
        </Link>
        <Link
          href="https://www.instagram.com/ivenko.alinaaa/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="instagram-page"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-bgColor text-mainDarkColor no-underline transition-colors first:mr-7 hover:border-textColorDarkBg hover:bg-mainLightColor hover:text-accentColor"
        >
          <SiInstagram />
        </Link>
      </div>
    </footer>
  );
}
