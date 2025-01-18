import AppointmentDetails from '@/components/admin/AppointmentDetails';
import { getAppointment } from '@/services/appointment';

export interface AppointmentDetailsProps {
  params: { id: string };
}

export default async function AppointmentDetailsPage({
  params,
}: AppointmentDetailsProps) {
  const { id } = params;
  const appointment = await getAppointment(id);
  return <AppointmentDetails appointment={appointment} />;
}
