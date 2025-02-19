'use client';

import { ServiceLabel } from '@/components/ui';
import { Appointment } from '@/types';
import { formatCurrency, formatDuration } from '@/utils/helpers';

import React from 'react';

export function AppointmentView({ appointment }: { appointment: Appointment }) {
  return (
    <div>
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-accentColor">
          Client Info
        </h2>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {appointment.name}
          </p>
          <p>
            <strong>Email:</strong> {appointment.email}
          </p>
          <p>
            <strong>Phone:</strong> {appointment.phone || 'N/A'}
          </p>
          <p>
            <strong>Instagram:</strong> {appointment.instagram || 'N/A'}
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-accentColor">
          Appointment Info
        </h2>
        <div className="space-y-2">
          <div>
            <strong>Service:</strong>{' '}
            <ServiceLabel service={appointment.service} />
          </div>
          <p>
            <strong>Date:</strong> {appointment.date}
          </p>
          <p>
            <strong>Time Slot:</strong> {appointment.slot}
          </p>
          <p>
            <strong>Duration:</strong> {formatDuration(appointment.duration)}
          </p>
          <p>
            <strong>Description:</strong>{' '}
            {appointment.description || 'No description provided'}
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-accentColor">
          Deposit
        </h2>
        <div className="space-y-2">
          <p>
            <strong>Amount: </strong>
            {formatCurrency(appointment.deposit.amount)}
          </p>
          <p>
            <strong>Tax: </strong>
            {formatCurrency(appointment.deposit.tax)}
          </p>
          <p>
            <strong>Fee: </strong>
            {formatCurrency(appointment.deposit.fee)}
          </p>
          <p className="font-bold">
            Total: {formatCurrency(appointment.deposit.total)}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-accentColor">
          Payment
        </h2>
        <div className="space-y-2">
          <p>
            <strong>Amount: </strong>
            {formatCurrency(appointment.payment?.amount || 0)}
          </p>
          <p>
            <strong>Tax: </strong>
            {formatCurrency(appointment.payment?.tax || 0)}
          </p>
          <p>
            <strong>Fee: </strong>
            {formatCurrency(appointment.payment?.fee || 0)}
          </p>
          <p>
            <strong>Tips: </strong>
            {formatCurrency(appointment.payment?.tip || 0)}
          </p>
          <p className="font-bold">
            Total: {formatCurrency(appointment.payment?.total || 0)}
          </p>
        </div>
      </section>
    </div>
  );
}
