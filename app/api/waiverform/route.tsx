import { sendEmail } from '@/lib/nodemailer/sendWaiverFormEmail';

import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await sendEmail(body);

    return NextResponse.json(
      { message: 'Waiverform has been sent successfully', status: 200 },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending waiverform:', errorMessage);
    return new NextResponse(`Error sending waiverform: ${errorMessage}`, {
      status: 500,
    });
  }
};
