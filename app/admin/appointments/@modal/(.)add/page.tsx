'use client';

import { AddAppointmentForm } from '@/components/admin';
import { Modal } from '@/components/ui';

import React from 'react';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <Modal show={true} onClose={() => router.back()}>
      <AddAppointmentForm />
    </Modal>
  );
}
