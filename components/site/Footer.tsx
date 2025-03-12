'use client';

import { StudioInfo } from '@/types';

import { SiGmail, SiInstagram, SiTiktok } from 'react-icons/si';
import { VscGithub } from 'react-icons/vsc';
import { VscGithubInverted } from 'react-icons/vsc';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer({ studio }: { studio: StudioInfo | null }) {
  const pathname = usePathname();

  if (pathname === '/waiverform') return null;

  const socialLinks = [
    {
      href: 'https://www.tiktok.com/@ivenko.alinaaa',
      icon: <SiTiktok />,
      label: 'tiktok',
      text: '@ivenko.alinaaa',
    },
    {
      href: 'https://www.instagram.com/ivenko.alinaaa/',
      icon: <SiInstagram />,
      label: 'instagram',
      text: '@ivenko.alinaaa',
    },
    {
      href: 'mailto:InkedbyAlina@gmail.com',
      icon: <SiGmail />,
      label: 'email',
      text: 'InkedbyAlina@gmail.com',
    },
  ];

  return (
    <footer
      role="contentinfo"
      className={
        'flex flex-col items-center gap-6 md:gap-0 md:items-end md:justify-between text-sm lg:text-base md:flex-row px-5 py-12 md:px-6 md:py-16 lg:py-20 xl:py-24 shadow-lg shadow-cardColor'
      }
    >
      <div className="flex flex-col md:flex-row md:justify-center items-center gap-4">
        <Image
          src="/gatita.png"
          alt="footer-logo"
          width="64"
          height="64"
          className="max-h-16 max-w-16 rounded-full"
        />
        {studio && (
          <div className="w-52 text-wrap text-center md:text-start">
            <p className="font-semibold uppercase">{studio.name}</p>
            <p>{studio.address}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start order-3 md:order-2">
        <span>&copy; 2023-{new Date().getFullYear()}, Alina Ivenko.</span>
        <div className="flex items-center justify-center text-center gap-2">
          <span>Developed by</span>
          <Link
            href="https://github.com/VadymPopov"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="frontend-developer-github"
            className="inline-block"
          >
            <VscGithub className="h-5 w-5 text-mainDarkColor transition-colors hover:text-accentColor" />
          </Link>
          <span>&</span>
          <Link
            href="https://github.com/AnastasiiaKor"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="backend-developer-github"
            className="inline-block"
          >
            <VscGithubInverted className="h-5 w-5 text-mainDarkColor transition-colors hover:text-accentColor" />
          </Link>
        </div>
      </div>

      <div className="order-2 mb-4 flex flex-col gap-2 md:order-3 md:mb-0">
        {socialLinks.map(({ href, icon, label, text }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label}-page`}
            className="flex items-center gap-2 text-mainDarkColor transition-colors hover:text-accentColor"
          >
            {icon} {text}
          </Link>
        ))}
      </div>
    </footer>
  );
}
