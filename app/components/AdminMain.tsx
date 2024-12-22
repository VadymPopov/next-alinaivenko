'use client';

import clsx from 'clsx';

import { useSidebar } from '../providers/SidebarContext';

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExtended } = useSidebar();

  return (
    <main
      className={clsx(
        'p-4 min-h-screen transition-all mt-16 ml-0',
        isExtended ? 'md:ml-64 ' : 'md:ml-16',
      )}
    >
      {children}
    </main>
  );
}
