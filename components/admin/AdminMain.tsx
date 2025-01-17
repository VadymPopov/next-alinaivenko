'use client';

import { useSidebar } from '@/providers/SidebarContext';

import clsx from 'clsx';

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExtended } = useSidebar();

  return (
    <main
      className={clsx(
        'bg-bgColor xl:px-10 pt-5 pb-20 px-5 min-h-screen transition-all mt-16 ml-0',
        isExtended ? 'md:ml-64 ' : 'md:ml-16',
      )}
    >
      {children}
    </main>
  );
}
