import React from 'react';
import { MdLogout } from 'react-icons/md';

import clsx from 'clsx';
import { signOut } from 'next-auth/react';

import { useSidebar } from '../../providers/SidebarContext';

export default function SignOutBtn() {
  const { isExtended } = useSidebar();
  return (
    <button
      className={clsx(
        'flex items-center justify-center p-3 md:p-5 md:justify-normal text-textColorDarkBg mt-auto mx-auto hover:text-mainLightColor  transition',
        isExtended ? 'gap-2' : 'md:justify-center',
      )}
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      <MdLogout size={18} />
      {isExtended && (
        <span className="font-medium text-white hidden md:block">Logout</span>
      )}
    </button>
  );
}
