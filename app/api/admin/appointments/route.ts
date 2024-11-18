import connect from '@/app/lib/db';
import Appointment from '@/app/lib/models/appointment';

import { format } from 'date-fns';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    const preparedBody = {
      ...body,
      date: format(body.date, 'MMMM dd, yyyy'),
      duration: Number(body.duration),
      deposit: {
        amount: 0,
        tax: 0,
        fee: 0,
        total: 0,
      },
    };

    const newAppointment = new Appointment(preparedBody);
    await newAppointment.save();

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
