'use client';

import { RxDoubleArrowRight } from 'react-icons/rx';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BookingSteps() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const links = [
    { label: 'Service', href: '/booking' },
    { label: 'Client', href: '/booking/client-info' },
    { label: 'Time', href: '/booking/schedule' },
    { label: 'Payment', href: '/booking/payment' },
  ];

  return (
    <ul className="flex items-center my-5 mx-0">
      {links.map((link, idx) => {
        return (
          <li key={link.label} className="flex justify-center items-center ">
            <Link
              href={link.href}
              className={clsx(
                'font-semibold  text-xs sm:text-sm cursor-pointer uppercase flex items-center justify-center border-none bg-none sm:p-2 p-1',
                isActive(link.href)
                  ? 'text-accentColor hover:text-accentColor'
                  : 'text-textColorDarkBg hover:text-cardColor',
                'disabled:cursor-not-allowed disabled:text-textColorDarkBg',
              )}
            >
              {link.label}
            </Link>
            {idx === links.length - 1 ? (
              ''
            ) : (
              <RxDoubleArrowRight className="w-4 h-4 text-textColorDarkBg" />
            )}
          </li>
        );
      })}
    </ul>
  );
}
