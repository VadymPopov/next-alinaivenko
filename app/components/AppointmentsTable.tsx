'use client';

import React from 'react';

import AppointmentCardView from './AppointmentCardView';
import { IAppointment } from './AppointmentDetails';
import AppointmentRowView from './AppointmentRowView';
import BlockedSlotView from './BlockedSlotView';
import { IBlockedSlot } from './WeekView';

interface AppointmentsTableProps {
  isLoading?: boolean;
  appointments: IAppointment[];
  combinedApptSlots?: (IAppointment | IBlockedSlot)[];
  headers: string[];
  isNew?: boolean;
}

export default function AppointmentsTable({
  isLoading,
  appointments,
  combinedApptSlots,
  headers,
  isNew,
}: AppointmentsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-separate border-spacing-y-2 hidden lg:table">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="pb-5 font-semibold text-sm xl:text-lg">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-5 text-lg "
              >
                Loading ...
              </td>
            </tr>
          ) : (
            <>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <AppointmentRowView
                    key={appointment._id}
                    appointment={appointment}
                    isNew={isNew}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="text-center py-5 text-lg "
                  >
                    No appointments found.
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
      <div className="grid sm:grid-cols-2 gap-4 lg:hidden">
        {combinedApptSlots && combinedApptSlots.length > 0 ? (
          combinedApptSlots.map((item) =>
            'reason' in item ? (
              <BlockedSlotView
                isCard={true}
                key={item._id}
                blockedSlot={item}
              />
            ) : (
              <AppointmentCardView
                key={item._id}
                appointment={item}
                isNew={isNew}
              />
            ),
          )
        ) : (
          <div className="text-center text-lg py-5">No appointments found.</div>
        )}
      </div>
    </div>
  );
}
