import { AppointmentDetails } from '@/components/admin';
import { getAppointment } from '@/services';

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
