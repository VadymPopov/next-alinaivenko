import { formatCurrency } from '@/utils/helpers';

interface generatePaymentConfirmationEmailI {
  name: string;
  email: string;
  date: string;
  client?: boolean;
  payment: {
    amount: number;
    tip: number;
    tax: number;
    fee: number;
    total: number;
  };
  receiptUrl: string | null;
}

export function generatePaymentConfirmationEmail({
  name,
  email,
  payment,
  client,
  date,
  receiptUrl,
}: generatePaymentConfirmationEmailI) {
  return `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #000;
    padding: 40px 20px;
    max-width: 600px;
    margin: 0 auto;
    border-radius: 10px;">
    
    <img src="cid:logo" alt="Ivenko Alina Logo" style="
      width: 60px;
      margin: 0 auto 20px auto;
      display: block;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #fff;" />

    <h2 style="
      color: #fff;
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;">
      Payment Confirmation
    </h2>

    <p style="
      font-size: 16px;
      color: #fff;
      text-align: justify;">
      Dear ${client ? name : 'Alina'},
    </p>
    <p style="
      font-size: 16px;
      color: #fff;
      text-align: justify;
      margin-bottom: 30px;
      text-indent: 10px;">
      ${client ? "Thank you for your payment! Here's the breakdown of your recent transaction:" : "A payment has been successfully processed. Here's the breakdown of the transaction:"}
    </p>

    <h3 style="
      color: #fff;
      font-size: 18px;
      text-align: left;
      margin-bottom: 10px;
      margin-top: 30px;">
      Payment Breakdown
    </h3>
    
    <table style="
      width: 100%;
      font-size: 16px;
      color: #303030;
      background-color: #fff;
      border-collapse: collapse;
      border-radius: 8px;
      overflow: hidden;">
      <tbody>
      ${
        !client
          ? `
        <tr style="background-color: #f7f7f7; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Client Name:</td>
          <td style="padding: 10px; text-align: right;">${name}</td>
        </tr>
        <tr style="background-color: #fff; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Email:</td>
          <td style="padding: 10px; text-align: right;">${email}</td>
        </tr>`
          : ''
      }
      <tr style="background-color: #f7f7f7; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Date:</td>
          <td style="padding: 10px; text-align: right;">${date}</td>
        </tr>
         <tr style="background-color: #fff; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Subtotal:</td>
          <td style="padding: 10px; text-align: right;">${formatCurrency(payment.amount)}</td>
        </tr>
        <tr style="background-color: #f7f7f7; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Tips:</td>
          <td style="padding: 10px; text-align: right;">${formatCurrency(payment.tip)}</td>
        </tr>
         <tr style="background-color: #fff; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Tax (GST/HST):</td>
          <td style="padding: 10px; text-align: right;">${formatCurrency(payment.tax)}</td>
        </tr>
         <tr style="background-color: #f7f7f7; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Processing Fee:</td>
          <td style="padding: 10px; text-align: right;">${formatCurrency(payment.fee)}</td>
        </tr>
        <tr style="background-color: #fff; border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">Total:</td>
          <td style="padding: 10px; text-align: right; font-weight: bold;">${formatCurrency(payment.total)}</td>
        </tr>
      </tbody>
    </table>

    ${
      receiptUrl
        ? `<p style="
          font-size: 16px;
          color: #ffffff;
          text-align: right;
          margin-top: 30px;">
              You can view and download your receipt here: 
              <a href="${receiptUrl}" style="color: #9DA4BD; text-decoration: underline;">
                View Receipt
              </a>
           </p>`
        : ''
    }

    ${
      client
        ? `<h3 style="
      color: #fff;
      font-size: 18px;
      text-align: left;
      margin-top: 30px;
      margin-bottom: 10px;">
      Looking forward to our next tattoo together. Happy healing, and shine bright!
    </h3>
     <p style="
      font-size: 16px;
      color: #fff;
      text-align: right;
      margin-top: 30px;">
      If you have any further questions, feel free to contact me at 
      <a href="mailto:inkedbyAlina@gmail.com" style="color: #9DA4BD; text-decoration: none;">inkedbyAlina@gmail.com</a> or via 
      <a href="https://www.instagram.com/ivenko.alinaaa/" style="color: #9DA4BD; text-decoration: none;">Instagram</a>.
    </p>

    <p style="
      font-size: 16px;
      color: #fff;
      text-align: justify;
      margin-top: 30px;">
      Thank you for choosing and trusting me with the world of art.
    </p>

    <p style="
      font-size: 16px;
      color: rgba(255, 108, 0, 1);
      text-align: center;
      margin-top: 40px;">
      Sincerely yours,
    </p>
    
    <p style="
      font-size: 16px;
      color: rgba(255, 108, 0, 1);
      text-align: center;">
      I.A.
    </p>
    `
        : ''
    }
    
    <footer style="
      font-size: 12px;
      color: #fff;
      text-align: center;
      margin-top: 30px;">
      © ${new Date().getFullYear()} Alina Ivenko. All rights reserved.
    </footer>
  </div>
`;
}
