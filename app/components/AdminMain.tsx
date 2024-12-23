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
        'bg-bgColor md:py-5 md:px-10 py-2.5 px-5 min-h-screen transition-all mt-16 ml-0',
        isExtended ? 'md:ml-64 ' : 'md:ml-16',
      )}
    >
      {children}
    </main>
  );
}
