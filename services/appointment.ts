import { getFetcher } from '@/lib/axiosFetchers';
import { Appointment } from '@/types';

export async function getAppointment(id: string) {
  return await getFetcher<Appointment>(`/api/appointments/${id}`);
}
