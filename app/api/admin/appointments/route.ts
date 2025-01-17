import Appointment from '@/db/models/Appointment';
import connect from '@/db/mongodb';
import convertToDate from '@/utils/convertToDate';

import { format } from 'date-fns';
import { type NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    await connect();

    const searchParams = request.nextUrl.searchParams;
    const weekStart = searchParams.get('start');
    const weekEnd = searchParams.get('end');

    if (!weekStart || !weekEnd) {
      return new NextResponse('Missing `start` or `end` query parameter.', {
        status: 400,
      });
    }

    const appointments = await Appointment.find({
      date: {
        $gte: weekStart,
        $lte: weekEnd,
      },
    });

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

    const preparedBody = {
      ...body,
      date: format(body.date, 'yyyy-MM-dd'),
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
