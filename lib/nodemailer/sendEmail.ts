import { generateEmailOptions } from '@/lib/nodemailer/generateEmailOptions';
import { getTransporter } from '@/lib/nodemailer/transporter';
import { generateAppointmentEmail } from '@/lib/templates/appointmentEmailTemplate';
import { generateUpdatedAppointmentEmail } from '@/lib/templates/updatedAppointmentEmailTemplate';

import path from 'path';

export interface ApptEmailData {
  name: string;
  email: string;
  phone?: string;
  instagram?: string;
  slot: string;
  date: string;
  address: string;
  service: string;
  duration: string;
  description?: string;
  images: string[];
  deposit: {
    amount: number;
    tax: number;
    fee: number;
    total: number;
  };
  receiptUrl: string | null;
}

interface SendApptEmailParams {
  data: ApptEmailData;
  client?: boolean;
  updated?: boolean;
}

export async function sendEmail({
  data,
  client,
  updated,
}: SendApptEmailParams) {
  const { date, slot, name, images, email } = data;
  try {
    const transporter = await getTransporter();
    const logoPath = path.resolve('./public/email-logo.png');
    const attachments = images && images.map((image) => ({ path: image }));
    const subject = updated
      ? 'Tattoo Appointment Rescheduling'
      : client
        ? `Tattoo Appointment Confirmation - ${date} at ${slot}`
        : `New Tattoo Appointment - ${date}, ${slot}, ${name}`;
    const htmlContent = updated
      ? generateUpdatedAppointmentEmail(data)
      : generateAppointmentEmail({ ...data, client });

    const emailOptions = generateEmailOptions({
      to: client || updated ? email : 'inkedbyalina@gmail.com',
      subject,
      htmlContent,
      logoPath,
      attachments,
    });

    return transporter.sendMail(emailOptions);
  } catch (error) {
    console.log('Error in sending email', error);
    throw new Error('Failed to send email');
  }
}
