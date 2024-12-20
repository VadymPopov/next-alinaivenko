'use client';

import AddAppointmentForm from '@/app/components/AddAppointmentForm';
import Modal from '@/app/components/Modal';

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
