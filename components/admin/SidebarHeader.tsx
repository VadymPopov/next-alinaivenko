import { ExtendMenuBtn } from '@/components/ui';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

export function SidebarHeader({
  isExtended,
  toggleSidebar,
  onLogoClick,
}: {
  isExtended: boolean;
  toggleSidebar: () => void;
  onLogoClick: () => void;
}) {
  return (
    <div>
      <div
        className={clsx('flex', isExtended ? ' justify-end' : 'justify-center')}
      >
        <ExtendMenuBtn toggleSidebar={toggleSidebar} isExtended={isExtended} />
      </div>
      <Image
        className={clsx(
          !isExtended && 'w-12 h-12',
          'my-11 mx-auto rounded-full cursor-pointer',
        )}
        width={80}
        height={80}
        src="/email-logo.png"
        alt="logo"
        onClick={onLogoClick}
      />
    </div>
  );
}
