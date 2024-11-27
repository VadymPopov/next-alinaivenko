'use client';

import React, { useState } from 'react';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import AppointmentView from './AppointmentView';
import EditAppointmentForm from './EditAppointmentForm';

export interface IAppointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: 'Small Tattoo' | 'Large Tattoo' | 'Touch-up' | 'Permanent Makeup';
  date: string;
  slot: string;
  duration: number;
  description: string;
  instagram: string;
  deposit: {
    amount: number;
    tax: number;
    fee: number;
    total: number;
  };
  payment?: {
    amount: number;
    tax: number;
    fee: number;
    total: number;
  };
}

export default function AppointmentDetails({
  appointment,
}: {
  appointment: IAppointment;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);

  const router = useRouter();

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDeleteClick = async () => {
    await fetch(`/api/appointments/${appointment._id}`, {
      method: 'DELETE',
    });
    router.replace('/admin/appointments');
  };

  return (
    <div className="min-h-screen bg-bgColor flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-mainLightColor rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-mainDarkColor">
            {isEditing ? 'Edit Appointment' : 'Appointment Details'}
          </h1>
          <div className="space-x-2">
            {!isEditing && !deleteFlag && (
              <button
                onClick={() => setDeleteFlag(true)}
                className="text-xl py-0.5 px-1 rounded-md border border-cardColor text-cardColor bg-transparent cursor-pointer
                 hover:text-accentColor hover:border-accentColor"
              >
                <MdDeleteOutline size={20} />
              </button>
            )}
            {!deleteFlag && (
              <button
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
