import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import { useSidebar } from '../providers/SidebarContext';

export interface SidebarItemProps {
  current?: boolean;
  pathname: string;
  children: React.ReactNode;
}

export default function SidebarItem({
  current,
  pathname,
  children,
}: SidebarItemProps) {
  const { isExtended } = useSidebar();
  return (
    <li>
      <Link
        href={pathname}
        className={clsx(
          isExtended ? 'gap-3.5 mx-1' : 'gap-0 justify-center',
          'h-9  flex items-center ',
          current &&
            isExtended &&
            'after:h-full after:ml-auto after:border-2 after:border-accentColor after:rounded-sm',
        )}
      >
        <span
          className={clsx(
            isExtended
              ? 'flex items-center mx-1 gap-3.5'
              : 'block rounded-full p-2 hover:bg-mainLightColor hover:text-accentColor',
            'font-medium text-mainLightColor h-9 transition-colors duration-300',
            current && !isExtended && 'bg-accentColor ',
          )}
        >
          {children}
        </span>
      </Link>
    </li>
  );
}
