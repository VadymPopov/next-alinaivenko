import AdminTitle from '@/components/admin/AdminTitle';
import AppointmentsTable from '@/components/admin/AppointmentsTable';
import { NEW_APPT_TABLE_HEADERS } from '@/constants';
import { getRecentAppointments } from '@/services/clients';

import React, { Suspense, use } from 'react';

export default function page() {
  const appointments = use(getRecentAppointments());
  return (
    <div>
      <div className=" border-b border-textColorDarkBg pb-5 mb-3">
        <AdminTitle title="New Appointments" />
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <AppointmentsTable
          combinedApptSlots={appointments}
          appointments={appointments}
          headers={NEW_APPT_TABLE_HEADERS}
          isNew={true}
        />
      </Suspense>
    </div>
  );
}
