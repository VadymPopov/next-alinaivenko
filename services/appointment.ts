import { IAppointment } from '@/components/admin/AppointmentDetails';
import { getFetcher } from '@/lib/axiosFetchers';

export async function getAppointment(id: string) {
  return await getFetcher<IAppointment>(`/api/appointments/${id}`);
}
