import { IAppointment } from '@/app/components/AppointmentDetails';
import NewAppointmentsTable from '@/app/components/NewAppointmentsTable';
import connect from '@/app/lib/db';
import Appointment from '@/app/lib/models/appointment';

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
      <div className="flex justify-between border-b border-textColorDarkBg pb-5 mb-3">
        <h2 className="text-accentColor font-semibold text-2xl text-end">
          New Appointments
        </h2>
      </div>
      <NewAppointmentsTable appointments={appointments} />
    </div>
  );
}
