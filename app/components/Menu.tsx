'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

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

type MenuProps = {
  onClick?: () => void;
  isMobile: boolean;
};

export default function Menu({ onClick, isMobile }: MenuProps) {
  const pathname = usePathname();

  return (
    <ul className="m-0 flex list-none flex-col items-center p-0 lg:flex-row lg:justify-center xl:mb-5 xl:mr-5">
      {menu.map(({ path, label }) => {
        return (
          <li
            key={label}
            className="mb-5 lg:mb-0 lg:mr-8 lg:last:mr-0"
            onClick={onClick}
          >
            <Link
              href={path}
              className={clsx(
                'block whitespace-nowrap px-2 py-1 text-xl font-semibold tracking-widest text-mainLightColor no-underline transition-colors duration-300 hover:text-accentColor focus:text-accentColor md:text-2xl lg:text-sm lg:text-cardColor xl:text-lg',
                pathname === path &&
                  'rounded-lg border-[1px] border-textColorDarkBg bg-bgColor',
                pathname === path && isMobile && 'text-cardColor',
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
