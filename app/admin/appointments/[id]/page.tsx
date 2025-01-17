import AppointmentDetails from '@/components/admin/AppointmentDetails';

async function getAppointment(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/${id}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch appointment');
  }
  return response.json();
}

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
