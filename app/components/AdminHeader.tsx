'use client';

import React from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { getProfileInfo } from '../utils/getProfileInfo';
import { capitalizeFirstLetter } from '../utils/helpers';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { profileImageURL } = getProfileInfo(session);

  const pageName = capitalizeFirstLetter(pathname.split('/')[2] || 'admin');

  return (
    <header className="fixed top-0 left-64 right-0 h-16 flex items-center gap-5 py-2.5 px-10 shadow-lg bg-gradient-to-r from-textColorDarkBg from-10%  to-bgColor to-80% z-50">
      <h1 className="flex-1 text-3xl font-semibld  text-mainLightColor">
        {pageName}
      </h1>
      <div className="w-px self-stretch bg-textColor" />
      <div className="flex gap-3">
        <Image
          className="rounded-full h-10 w-10 cursor-pointer"
          alt="profile picture"
          src={profileImageURL}
          width={40}
          height={40}
          onClick={() => router.push('/admin/profile', { scroll: false })}
        />
        <div>
          <p className="text-base	font-semibold text-textColor">
            {session?.user?.role}
          </p>
          <p className="text-sm	font-light text-textColor">
            {session?.user?.email}
          </p>
        </div>
      </div>
    </header>
  );
}
