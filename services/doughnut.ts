import { SERVICE_TYPES } from '@/constants';
import Appointment from '@/db/models/Appointment';
import connect from '@/db/mongodb';

export async function getDatabyServiceType() {
  try {
    await connect();

    const results = await Appointment.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $project: { _id: 0, service: '$_id', count: 1 } },
    ]);

    const response = SERVICE_TYPES.map((type) => {
      const found = results.find((item) => item.service === type);
      return { service: type, count: found ? found.count : 0 };
    });

    return response;
  } catch (error) {
    console.error('Error counting documents:', error);
    return SERVICE_TYPES.map((type) => ({ service: type, count: 0 }));
  }
}
