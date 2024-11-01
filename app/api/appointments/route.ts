import connect from '@/app/lib/db';
import Appointment from '@/app/lib/modals/appointment';
import { sendEmail } from '@/app/lib/nodemailer/sendEmail';

import { type NextRequest, NextResponse } from 'next/server';

interface AppointmentType {
  date: string;
  slot: string;
  duration: number;
}

function convertToDate(appointment: AppointmentType): Date {
  const [month, day, year] = appointment.date.split('.').map(Number);

  let hours = Number(appointment.slot.replace(/(am|pm)/i, '').split(':')[0]);
  const minutes = Number(
    appointment.slot.replace(/(am|pm)/i, '').split(':')[1],
  );

  if (/pm/i.test(appointment.slot) && hours !== 12) {
    hours += 12;
  } else if (/am/i.test(appointment.slot) && hours === 12) {
    hours = 0;
  }

  return new Date(year, month - 1, day, hours, minutes);
}

export const GET = async (request: NextRequest) => {
  try {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const query: Record<string, unknown> = {};

    const date = searchParams.get('date');
    const month = searchParams.get('month');

    if (date) query.date = date;
    if (month) query.date = { $regex: `^${month}\\.` };

    const appointments = await Appointment.find(query);
    appointments.sort(
      (a, b) => convertToDate(a).getTime() - convertToDate(b).getTime(),
    );

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching appointments:', errorMessage);
    return new NextResponse(`Error in fetching appointment: ${errorMessage}`, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newAppointment = new Appointment(body);
    await newAppointment.save();

    await Promise.all([
      sendEmail({ data: body, client: true }),
      sendEmail({ data: body }),
    ]);

    return NextResponse.json(
      { message: 'Appointment has been added', newAppointment },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error adding new appointment:', errorMessage);
    return new NextResponse(`Error adding new appointment: ${errorMessage}`, {
      status: 500,
    });
  }
};
