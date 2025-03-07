import { Appointment, Studio, connect } from '@/db';
import { sendEmail } from '@/lib/nodemailer/sendEmail';

import { NextResponse } from 'next/server';

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  try {
    await connect();
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return new NextResponse('Appointment not found', { status: 404 });
    }

    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching appointment:', errorMessage);
    return new NextResponse(`Error fetching appointment: ${errorMessage}`, {
      status: 500,
    });
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params;
  const body = await request.json();

  try {
    await connect();
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return new NextResponse('Bad request', {
        status: 404,
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (
      body.date !== appointment.date ||
      body.slot !== appointment.slot ||
      body.duration !== appointment.duration
    ) {
      const studio = await Studio.findOne();
      await sendEmail({
        data: { ...body, address: studio?.address || '' },
        updated: true,
      });
    }

    return NextResponse.json(
      {
        message: 'Appointment has been updated successfully',
        updatedAppointment,
      },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error updating appointment:', errorMessage);
    return new NextResponse(`Error updating  appointment: ${errorMessage}`, {
      status: 500,
    });
  }
};

export const DELETE = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  try {
    await connect();
    const result = await Appointment.findByIdAndDelete(id);
    if (!result) {
      return new NextResponse('Bad request', {
        status: 404,
      });
    }

    return NextResponse.json(
      {
        message: 'Appointment has been deleted',
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error deleting appointment:', errorMessage);
    return new NextResponse(`Error deleting appointment: ${errorMessage}`, {
      status: 500,
    });
  }
};
