'use client';

import AddAppointmentForm from '@/components/admin/AddAppointmentForm';
import Modal from '@/components/ui/Modal';

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
