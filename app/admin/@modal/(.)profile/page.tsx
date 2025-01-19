'use client';

import { ProfileView } from '@/components/admin';
import { Modal } from '@/components/ui';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <Modal show={true} onClose={() => router.back()}>
      <ProfileView />
    </Modal>
  );
}
