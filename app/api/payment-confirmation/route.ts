import { Appointment, connect } from '@/db';
import { sendEmail } from '@/lib/nodemailer/sendPaymentConfirmationEmail';
import { getReceipt } from '@/lib/stripe/getReceipt';

import { format } from 'date-fns';
import { NextResponse } from 'next/server';

export const PUT = async (request: Request) => {
  try {
    const body = await request.json();
    const date = format(new Date(), 'MMMM dd, yyyy');
    await connect();
    const receiptUrl = await getReceipt(body.paymentIntentId);

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
      receiptUrl,
    };

    const query = {
      $and: [
        { date: format(new Date(), 'yyyy-MM-dd') },
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
