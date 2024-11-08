import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const getReceipt = async (id: string) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(id);

  if (paymentIntent.latest_charge) {
    const charge = await stripe.charges.retrieve(
      paymentIntent.latest_charge as string,
    );
    return charge.receipt_url;
  } else {
    return null;
  }
};
