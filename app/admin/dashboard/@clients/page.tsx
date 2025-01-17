import AdminTitle from '@/components/admin/AdminTitle';
import { IAppointment } from '@/components/admin/AppointmentDetails';
import AppointmentsTable from '@/components/admin/AppointmentsTable';
import { NEW_APPT_TABLE_HEADERS } from '@/constants/constants';
import Appointment from '@/db/models/Appointment';
import connect from '@/db/mongodb';

import { Types } from 'mongoose';

interface AppointmentDocument extends Omit<IAppointment, '_id'> {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

function sanitizeDocument(doc: AppointmentDocument) {
  return {
    ...doc,
    _id: doc._id?.toString(),
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  };
}

async function getRecentAppointments() {
  try {
    await connect();

    const recentAppointments = await Appointment.find({})
      .sort({ createdAt: -1 })
      .limit(7)
      .lean<AppointmentDocument[]>();

    const sanitizedData = recentAppointments.map(sanitizeDocument);

    return sanitizedData;
  } catch (error) {
    console.error('Error fetching recent appointments:', error);
    return [];
  }
}

export default async function page() {
  const appointments = await getRecentAppointments();
  return (
    <div>
      <div className=" border-b border-textColorDarkBg pb-5 mb-3">
        <AdminTitle title="New Appointments" />
      </div>
      <AppointmentsTable
        combinedApptSlots={appointments}
        appointments={appointments}
        headers={NEW_APPT_TABLE_HEADERS}
        isNew={true}
      />
    </div>
  );
}
