import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

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
  return (
    <li>
      <Link
        href={pathname}
        className={clsx(
          'flex items-center h-9 mx-1 gap-3.5',
          current &&
            'after:h-full after:ml-auto after:border-2 after:border-accentColor after:rounded-sm',
        )}
      >
        <span className="font-medium text-mainLightColor flex items-center h-9 mx-1 gap-3.5">
          {children}
        </span>
      </Link>
    </li>
  );
}
