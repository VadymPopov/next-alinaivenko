import connect from '@/app/lib/db';
import Appointment from '@/app/lib/models/appointment';

import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (request: NextRequest) => {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json(
      { error: 'Missing Stripe signature' },
      { status: 400 },
    );
  }
  let event;

  try {
    const rawBody = await request.arrayBuffer();
    const buffer = Buffer.from(rawBody);
    event = stripe.webhooks.constructEvent(
      buffer,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    console.error('Webhook Error:', errorMessage);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }

  if (event.type === 'charge.updated') {
    const charge = event.data.object;
    const updateField =
      charge.metadata?.type === 'deposit' ? 'deposit.fee' : 'payment.fee';
    const balanceTransactionId = charge.balance_transaction as string;
    const balanceTransaction =
      await stripe.balanceTransactions.retrieve(balanceTransactionId);

    await connect();
    await Appointment.findOneAndUpdate(
      {
        paymentIntentId: charge.payment_intent,
      },
      {
        $set: { [updateField]: balanceTransaction.fee / 100 },
      },
      {
        new: true,
      },
    );
  }

  return NextResponse.json({ received: true });
};
