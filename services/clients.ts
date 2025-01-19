import { Appointment, connect } from '@/db';
import { Appointment as AppointmentType } from '@/types';

import { Types } from 'mongoose';

interface AppointmentDocument extends Omit<AppointmentType, '_id'> {
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

export async function getRecentAppointments() {
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
