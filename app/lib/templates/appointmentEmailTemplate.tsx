import { formatCurrency } from '@/app/utils/helpers';

interface generateAppointmentEmailI {
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
  client?: boolean;
  deposit: {
    amount: number;
    tax: number;
    fee: number;
    total: number;
  };
}

export function generateAppointmentEmail({
  name,
  email,
  phone,
  instagram,
  slot,
  date,
  address,
  service,
  duration,
  description,
  client,
  deposit,
}: generateAppointmentEmailI) {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #000; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 10px;">
    <img src="cid:logo" alt="Ivenko Alina Logo" style="width: 60px; margin: 0 auto 20px auto; display: block; border-radius: 50%; object-fit: cover; border: 2px solid #fff;" />

    <h2 style="color: #fff; font-size: 24px; text-align: center; margin-bottom: 20px;">
      ${client ? 'Tattoo Appointment Confirmation' : 'New Tattoo Appointment'}
    </h2>

    ${client ? `<p style="font-size: 16px; color: #fff; text-align: justify;">Dear ${name},</p>` : ''}
    <p style="font-size: 16px; color: #fff; text-align: justify; margin-bottom: 30px; text-indent: 10px;">
      ${client ? "I'm excited to confirm your upcoming tattoo appointment and look forward to creating a unique and beautiful piece of art for you. Here are the details of your appointment:" : 'Here are the details of the new appointment:'}
    </p>

    ${
      !client
        ? `
      <h3 style="color: #fff; font-size: 18px; text-align: left; margin-bottom: 10px;">Client Information</h3>
      <table style="width: 100%; font-size: 16px; background-color: #fff; border-collapse: collapse; border-radius: 8px; overflow: hidden;">
        <tbody>
          <tr style="background-color: #f7f7f7; border-bottom: 1px solid #303030;">
            <td style="padding: 10px; font-weight: bold; text-align: left; color: #303030;">Name:</td>
            <td style="padding: 10px; text-align: right; color: #303030;">${name}</td>
          </tr>
          <tr style="background-color: #fff; border-bottom: 1px solid #303030;">
            <td style="padding: 10px; font-weight: bold; text-align: left; color: #303030;">Email:</td>
            <td style="padding: 10px; text-align: right; color: #303030;">${email}</td>
          </tr>
          ${
            phone
              ? `<tr style="background-color: #f7f7f7; border-bottom: 1px solid #303030;">
            <td style="padding: 10px; font-weight: bold; text-align: left; color: #303030;">Phone:</td>
            <td style="padding: 10px; text-align: right; color: #303030;">${phone}</td>
          </tr>`
              : ''
          }
          ${
            instagram
              ? `<tr style="background-color: #fff;">
            <td style="padding: 10px; font-weight: bold; text-align: left; color: #303030;">Instagram:</td>
            <td style="padding: 10px; text-align: right; color: #303030;">${instagram}</td>
          </tr>`
              : ''
          }
        </tbody>
      </table>
    `
        : ''
    }

    <h3 style="color: #fff; font-size: 18px; text-align: left; margin-bottom: 10px; margin-top: 30px;">Appointment Information</h3>
    <table style="width: 100%; font-size: 16px; color: #303030; background-color: #fff; border-collapse: collapse; border-radius: 8px; overflow: hidden;">
      <tbody>
        <tr style="background-color: #f7f7f7; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Date:</td>
          <td style="padding: 10px; text-align: right;">${date}</td>
        </tr>
        <tr style="background-color: #fff; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Time:</td>
          <td style="padding: 10px; text-align: right;">${slot}</td>
        </tr>
        <tr style="background-color: #f7f7f7; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Duration:</td>
          <td style="padding: 10px; text-align: right;">${duration}</td>
        </tr>
        <tr style="background-color: #fff; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Procedure:</td>
          <td style="padding: 10px; text-align: right;">${service}</td>
        </tr>
         <tr style="background-color: #fff; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Deposit:</td>
          <td style="padding: 10px; text-align: right;">${formatCurrency(deposit.amount)}</td>
        </tr>
         <tr style="background-color: #fff; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Tax (GST/HST):</td>
          <td style="padding: 10px; text-align: right;">${formatCurrency(deposit.tax)}</td>
        </tr>
         <tr style="background-color: #fff; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Processing Fee:</td>
          <td style="padding: 10px; text-align: right;">${formatCurrency(deposit.fee)}</td>
        </tr>
        ${
          client
            ? `<tr style="background-color: #f7f7f7; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Studio Address:</td>
          <td style="padding: 10px; text-align: right;">${address}</td>
        </tr>`
            : ''
        }
        ${
          description
            ? `<tr style="background-color: #fff;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Description:</td>
          <td style="padding: 10px; text-align: justify;">${description}</td>
        </tr>`
            : ''
        }
      </tbody>
    </table>

    ${
      client
        ? `
      <h3 style="color: #fff; font-size: 18px; text-align: left; margin-top: 30px; margin-bottom: 10px;">Please remember the following important information for your appointment:</h3>
      <ol style="padding-left: 20px; color: #fff; text-align: justify;">
        <li style="margin-bottom: 10px;"><strong style="color: #9DA4BD;">Arrival Time:</strong> Please arrive at the studio at least <strong>15 minutes</strong> before your scheduled appointment time.</li>
        <li style="margin-bottom: 10px;"><strong style="color: #9DA4BD;">Design Ideas:</strong> If you have any specific design ideas, please bring them with you.</li>
        <li style="margin-bottom: 10px;"><strong style="color: #9DA4BD;">Consultation:</strong> There will be a brief consultation before tattooing begins.</li>
        <li style="margin-bottom: 10px;"><strong style="color: #9DA4BD;">ID and Age Requirement:</strong> Please bring a valid government-issued photo ID. You must be <strong>18 years or older</strong>.</li>
        <li style="margin-bottom: 10px;"><strong style="color: #9DA4BD;">Cancellation Policy:</strong> Our cancellation policy requires at least <strong>1 week&apos;s notice</strong> for rescheduling, and the tattoo deposit is <strong>non-refundable</strong>.</li>
      </ol>
      <p style="font-size: 16px; color: #fff; text-align: right; margin-top: 30px;">For questions, contact me at <a href="mailto:inkedbyAlina@gmail.com" style="color: #9DA4BD; text-decoration: none;">inkedbyAlina@gmail.com</a> or via <a href="https://www.instagram.com/ivenko.alinaaa/" style="color: #9DA4BD; text-decoration: none;">Instagram</a>.</p>
      <p style="font-size: 16px; color: #fff; text-align: justify; margin-top: 30px;">Thank you for choosing and trusting me with world of art.</p>
      <p style="font-size: 16px; color: #fff; text-align: justify;">See you on <strong>${date}</strong>!</p>
      <p style="font-size: 16px; color: rgba(255, 108, 0, 1); text-align: center; margin-top: 40px;">Sincerely yours,</p>
      <p style="font-size: 16px; color: rgba(255, 108, 0, 1); text-align: center;">I.A.</p>
    `
        : ''
    }

    <footer style="font-size: 12px; color: #fff; text-align: center; margin-top: 30px;">
      © ${new Date().getFullYear()} Alina Ivenko. All rights reserved.
    </footer>
  </div>
`;
}
