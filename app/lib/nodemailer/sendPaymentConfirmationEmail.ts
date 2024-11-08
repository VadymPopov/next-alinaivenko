import path from 'path';

import { generatePaymentConfirmationEmail } from '../templates/generatePaymentConfirmationEmail';
import { generateEmailOptions } from './generateEmailOptions';
import { getTransporter } from './transporter';

export interface IData {
  name: string;
  email: string;
  date: string;
  payment: {
    amount: number;
    tip: number;
    tax: number;
    fee: number;
    total: number;
  };
  receiptUrl: string | null;
}

interface sendEmailI {
  data: IData;
  client?: boolean;
}

export async function sendEmail({ data, client }: sendEmailI) {
  const { name, email } = data;
  try {
    const transporter = await getTransporter();
    const logoPath = path.resolve('./public/email-logo.png');
    const subject = client
      ? `Payment Confirmation`
      : `Payment Confirmation from - ${name}`;

    const htmlContent = generatePaymentConfirmationEmail({ ...data, client });

    const emailOptions = generateEmailOptions({
      to: client ? email : 'inkedbyalina@gmail.com',
      subject,
      htmlContent,
      logoPath,
    });

    return transporter.sendMail(emailOptions);
  } catch (error) {
    console.log('Error in sending email', error);
    throw new Error('Failed to send email');
  }
}
