'use client';

import { AppointmentView, EditAppointmentForm } from '@/components/admin';
import { Button } from '@/components/ui';
import { useAppointments } from '@/hooks';
import { Appointment } from '@/types';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  MdDeleteOutline,
  MdOutlineArrowBackIos,
  MdOutlineModeEdit,
} from 'react-icons/md';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export function AppointmentDetails({
  appointment,
}: {
  appointment: Appointment;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const { deleteAppointment } = useAppointments();

  const router = useRouter();

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteAppointment(appointment._id);
      toast.success('An appointment was successfully deleted!', {
        duration: 3000,
      });
      router.replace('/admin/appointments');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete appointment',
      );
    }
  };

  return (
    <div className="min-h-screen bg-bgColor flex flex-col items-center py-10 px-4 ">
      <Button
        styles="fixed top-24 left-80 px-5 py-3 text-xs bg-bgColor shadow-xl"
        onClick={() => router.back()}
      >
        <MdOutlineArrowBackIos />
        Back
      </Button>
      <div className="top- w-full max-w-3xl bg-mainLightColor rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-mainDarkColor">
            {isEditing ? 'Edit Appointment' : 'Appointment Details'}
          </h1>
          <div className="space-x-2">
            {!isEditing && !deleteFlag && (
              <button
                data-testid="delete-btn"
                onClick={() => setDeleteFlag(true)}
                className="text-xl py-0.5 px-1 rounded-md border border-cardColor text-cardColor bg-transparent cursor-pointer
                 hover:text-accentColor hover:border-accentColor"
              >
                <MdDeleteOutline size={20} />
              </button>
            )}
            {!deleteFlag && (
              <button
                data-testid="edit-btn"
                onClick={toggleEditMode}
                className={clsx(
                  ' py-0.5 px-1  cursor-pointer ',
                  isEditing
                    ? 'text-lg hover:underline font-medium'
                    : 'text-xl hover:text-accentColor hover:border-accentColor rounded-md border border-cardColor text-cardColor bg-transparent',
                )}
              >
                {isEditing ? 'Cancel' : <MdOutlineModeEdit size={20} />}
              </button>
            )}
            {deleteFlag && (
              <div className="space-x-2">
                <button
                  type="button"
                  title="yes"
                  onClick={handleDeleteClick}
                  className="text-lg font-medium py-0.5 px-1  text-cardColor bg-transparent cursor-pointer hover:text-accentColor hover:border-accentColor hover:underline"
                >
                  Yes
                </button>
                <button
                  type="button"
                  title="no"
                  onClick={() => setDeleteFlag(false)}
                  className="text-lg font-medium py-0.5 px-1  text-cardColor bg-transparent cursor-pointer hover:text-accentColor hover:border-accentColor hover:underline"
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>

        {!isEditing ? (
          <AppointmentView appointment={appointment} />
        ) : (
          <EditAppointmentForm appointment={appointment} />
        )}
      </div>
    </div>
  );
}
