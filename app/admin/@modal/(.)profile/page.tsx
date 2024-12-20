'use client';

import Modal from '@/app/components/Modal';
import ProfileForm from '@/app/components/ProfileForm';
import { getProfileInfo } from '@/app/utils/getProfileInfo';

import React from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const { profileImageURL, isGoogle } = getProfileInfo(session);

  return (
    <Modal show={true} onClose={() => router.back()}>
      <div className="flex gap-5 py-5 px-2.5">
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
    </Modal>
  );
}
