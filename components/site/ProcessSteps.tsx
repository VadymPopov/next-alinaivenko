'use client';

import { Link as LinkType } from '@/types';

import { RxDoubleArrowRight } from 'react-icons/rx';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ProcessStepsProps {
  links: LinkType[];
}

export function ProcessSteps({ links }: ProcessStepsProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

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
