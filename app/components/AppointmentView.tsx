'use client';

import React from 'react';

import { formatCurrency, formatDuration } from '../utils/helpers';
import { IAppointment } from './AppointmentDetails';
import ServiceLabel from './ServiceLabel';

export default function AppointmentView({
  appointment,
}: {
  appointment: IAppointment;
}) {
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
            <strong>Phone:</strong> {appointment.phone}
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
            <strong>Amount:</strong>{' '}
            {formatCurrency(appointment.deposit.amount)}
          </p>
          <p>
            <strong>Tax:</strong> {formatCurrency(appointment.deposit.tax)}
          </p>
          <p>
            <strong>Fee:</strong> {formatCurrency(appointment.deposit.fee)}
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
            <strong>Amount:</strong>{' '}
            {formatCurrency(appointment.deposit.amount || 0)}
          </p>
          <p>
            <strong>Tax:</strong> {formatCurrency(appointment.deposit.tax || 0)}
          </p>
          <p>
            <strong>Fee:</strong> {formatCurrency(appointment.deposit.fee || 0)}
          </p>
          <p className="font-bold">
            Total: {formatCurrency(appointment.deposit.total)}
          </p>
        </div>
      </section>
    </div>
  );
}
