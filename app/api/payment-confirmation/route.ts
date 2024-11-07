import connect from '@/app/lib/db';
import Appointment from '@/app/lib/modals/appointment';
import { sendEmail } from '@/app/lib/nodemailer/sendPaymentConfirmationEmail';

import { format } from 'date-fns';
import { NextResponse } from 'next/server';

export const PUT = async (request: Request) => {
  try {
    const body = await request.json();
    const date = format(new Date(), 'MMMM dd, yyyy');
    await connect();

    const preparedBody = {
      paymentIntentId: body.paymentIntentId,
      payment: {
        amount: body.amount,
        tip: body.tip,
        tax: body.tax,
        fee: body.fee,
        total: body.total,
      },
    };

    const emailBody = {
      name: body.name,
      email: body.email,
      date,
      payment: preparedBody.payment,
    };

    const query = {
      $and: [
        { date },
        {
          $or: [{ name: body.name }, { email: body.email }],
        },
      ],
    };

    await Appointment.findOneAndUpdate(query, preparedBody, {
      new: true,
    });

    await Promise.all([
      sendEmail({ data: emailBody, client: true }),
      sendEmail({ data: emailBody }),
    ]);

    return NextResponse.json(
      { message: 'Payment has been made' },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing payment:', errorMessage);
    return new NextResponse(`Error processing payment: ${errorMessage}`, {
      status: 500,
    });
  }
};
