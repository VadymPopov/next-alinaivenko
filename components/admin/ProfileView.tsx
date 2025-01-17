'use client';

import ProfileForm from '@/components/admin/ProfileForm';
import { getProfileInfo } from '@/utils/getProfileInfo';

import React from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function ProfileView() {
  const { data: session } = useSession();
  const { profileImageURL, isGoogle } = getProfileInfo(session);
  return (
    <>
      <div className="flex-col justify-center items-center flex md:flex-row gap-5 py-5 px-2.5">
        <Image
          className="rounded-full h-24 w-24 cursor-pointer"
          alt="profile picture"
          src={profileImageURL}
          width={96}
          height={96}
        />
        <div>
          <p className="text-2xl	font-semibold text-textColor mb-2">
            {session?.user?.name}
          </p>

          <p className="text-base	 text-textColor">
            Role: {session?.user?.role}
          </p>
          <p className="text-base	 text-textColor">
            Provider type: {session?.user?.provider}
          </p>
          <p className="text-base text-textColor ">{session?.user?.email}</p>
        </div>
      </div>
      {!isGoogle && <ProfileForm id={session?.user?.id} />}
    </>
  );
}
