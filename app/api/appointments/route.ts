import connect from '@/app/lib/db';
import Appointment from '@/app/lib/modals/appointment';
import { sendEmail } from '@/app/lib/nodemailer/sendEmail';

import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connect();
    const appointments = await Appointment.find();
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
