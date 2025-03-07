'use client';

import { SidebarHeader, SidebarList } from '@/components/admin';
import { SignOutBtn } from '@/components/ui';
import { useSidebar } from '@/providers/SidebarContext';

import React from 'react';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

export function Sidebar() {
  const { isExtended, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside
      className={clsx(
        isExtended ? 'w-64' : 'w-16',
        'hidden bg-gray-800 text-white md:block fixed h-full transition-all',
      )}
    >
      <nav className="flex flex-col h-full overflow-y-auto  bg-gradient-to-b from-mainDarkColor from-10%  to-cardColor to-80%">
        <SidebarHeader
          toggleSidebar={toggleSidebar}
          isExtended={isExtended}
          onLogoClick={() => router.push('/admin/dashboard')}
        />
        <SidebarList pathname={pathname} isExtended={isExtended} />
        <SignOutBtn />
      </nav>
    </aside>
  );
}
