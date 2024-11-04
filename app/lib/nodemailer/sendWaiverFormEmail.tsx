import PDFContent from '@/app/components/PDFContent/PDFContent';

import { renderToBuffer } from '@react-pdf/renderer';
import path from 'path';

import { generateWaiverFormEmail } from '../templates/waiverformEmailTemplate';
import { generateEmailOptions } from './generateEmailOptions';
import { getTransporter } from './transporter';

export async function sendWaiverFormEmail(data: {
  name: string;
  appointmentDate: string;
  isClientUnder18: boolean;
  email: string;
  phone?: string;
  address: string;
}) {
  const { name, appointmentDate, isClientUnder18 } = data;
  try {
    const transporter = await getTransporter();
    const logoPath = path.resolve('./public/email-logo.png');
    const subject = `Waiver - ${name}, ${appointmentDate}`;
    const htmlContent = generateWaiverFormEmail(data);
    const pdfBuffer = await renderToBuffer(
      <PDFContent values={data} isClientUnder18={isClientUnder18} />,
    );

    const emailOptions = generateEmailOptions({
      to: 'inkedbyalina@gmail.com',
      subject,
      htmlContent,
      logoPath,
      attachments: [
        {
          filename: `Waiver ${name}, ${appointmentDate}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    return transporter.sendMail(emailOptions);
  } catch (error) {
    console.log('Error in sending email', error);
    throw new Error('Failed to send email');
  }
}
