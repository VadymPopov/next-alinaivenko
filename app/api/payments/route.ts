import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (request: NextRequest) => {
  try {
    const { email, name } = await request.json();
    const searchParams = request.nextUrl.searchParams;
    const service = searchParams.get('service');

    let serviceAmount;

    switch (service) {
      case 'permanent':
      case 'small-tattoo':
        serviceAmount = 11658;
        break;
      case 'large-tattoo':
        serviceAmount = 13983;
        break;
      case 'touch-up':
        serviceAmount = 2356;
        break;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'cad',
      amount: serviceAmount!,
      automatic_payment_methods: {
        enabled: true,
      },
      description: `${service} Deposit by ${name}`,
      receipt_email: `${email}`,
    });

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating payment intent:', errorMessage);
    return new NextResponse(`Error creating payment intent: ${errorMessage}`, {
      status: 500,
    });
  }
};
