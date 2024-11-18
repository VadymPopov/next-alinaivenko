import connect from '@/app/lib/db';
import Appointment from '@/app/lib/models/appointment';
import { sendEmail } from '@/app/lib/nodemailer/sendEmail';
import { getReceipt } from '@/app/lib/stripe/getReceipt';

import { format } from 'date-fns';
import { type NextRequest, NextResponse } from 'next/server';

interface AppointmentType {
  date: string;
  slot: string;
  duration: number;
}

function convertToDate(appointment: AppointmentType): Date {
  const date = format(new Date(appointment.date), 'MM.dd.yyyy');

  const [month, day, year] = date.split('.').map(Number);

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
    const day = searchParams.get('day');
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    if (day && month && year) {
      query.date = { $regex: `^${month} ${day}, ${year}$`, $options: 'i' };
    } else if (month && year) {
      query.date = { $regex: `^${month} \\d{2}, ${year}$`, $options: 'i' };
    } else if (month) {
      query.date = { $regex: `^${month} \\d{2}, \\d{4}$`, $options: 'i' };
    } else if (year) {
      query.date = { $regex: `^[A-Za-z]+ \\d{2}, ${year}$`, $options: 'i' };
    } else if (date) {
      query.date = date;
    }

    const appointments =
      Object.keys(query).length > 0
        ? await Appointment.find(query)
        : await Appointment.find();

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
    const receiptUrl = await getReceipt(body.paymentIntentId);

    const preparedBody = {
      ...body,
      deposit: {
        amount: body.amount,
        tax: body.tax,
        fee: body.fee,
        total: body.total,
      },
      receiptUrl,
    };

    const newAppointment = new Appointment(preparedBody);
    await newAppointment.save();

    await Promise.all([
      sendEmail({ data: preparedBody, client: true }),
      sendEmail({ data: preparedBody }),
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
