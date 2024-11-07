import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const getServiceAmount = (serviceName: string) => {
  let serviceAmount;

  switch (serviceName) {
    case 'Permanent Makeup':
    case 'Small Tattoo':
      serviceAmount = 11658;
      break;
    case 'Large Tattoo':
      serviceAmount = 13983;
      break;
    case 'Touch-up':
      serviceAmount = 2356;
      break;
  }

  return serviceAmount;
};

export const POST = async (request: NextRequest) => {
  try {
    const { email, name, service, total } = await request.json();
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const isBooking = type === 'booking';

    const amountToPay = isBooking
      ? getServiceAmount(service)
      : Math.round(total * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'cad',
      amount: amountToPay!,
      automatic_payment_methods: {
        enabled: true,
      },
      description: isBooking
        ? `${service} Deposit by ${name}`
        : `Payment by ${name}`,
      receipt_email: `${email}`,
      metadata: {
        type: isBooking ? 'deposit' : 'payment',
      },
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
