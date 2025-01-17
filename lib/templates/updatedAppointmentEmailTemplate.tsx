interface generateUpdatedAppointmentEmailI {
  name: string;
  slot: string;
  date: string;
  address: string;
  service: string;
  duration: string;
}

export function generateUpdatedAppointmentEmail({
  name,
  slot,
  date,
  address,
  service,
  duration,
}: generateUpdatedAppointmentEmailI) {
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
      Tattoo Appointment Rescheduling
    </h2>

    <p style="
      font-size: 16px;
      color: #fff;
      text-align: justify;">
      Hello ${name},
    </p>
    <p style="
      font-size: 16px;
      color: #fff;
      text-align: justify;
      margin-bottom: 30px;
      text-indent: 10px;">
      Please find the updated details of your appointment below:
    </p>

    <h3 style="
      color: #fff;
      font-size: 18px;
      text-align: left;
      margin-bottom: 10px;
      margin-top: 30px;">
      Appointment Information
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
        <tr style="
          background-color: #f7f7f7;
          border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">
            Date:
          </td>
          <td style="padding: 10px; text-align: right;">
            ${date}
          </td>
        </tr>
        <tr style="
          background-color: #fff;
          border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">
            Time:
          </td>
          <td style="padding: 10px; text-align: right;">
            ${slot}
          </td>
        </tr>
        <tr style="
          background-color: #f7f7f7;
          border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">
            Duration:
          </td>
          <td style="padding: 10px; text-align: right;">
            ${duration}min
          </td>
        </tr>
        <tr style="
          background-color: #fff;
          border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">
            Procedure:
          </td>
          <td style="padding: 10px; text-align: right;">
            ${service}
          </td>
        </tr>
        <tr style="
          background-color: #f7f7f7;
          border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">
            Studio Address:
          </td>
          <td style="padding: 10px; text-align: right;">
            ${address}
          </td>
        </tr>
      </tbody>
    </table>

    <h3 style="
      color: #fff;
      font-size: 18px;
      text-align: left;
      margin-top: 30px;
      margin-bottom: 10px;">
      Please remember the following important information for your appointment:
    </h3>
    
    <ol style="
      padding-left: 20px;
      color: #fff;
      text-align: justify;">
      <li style="margin-bottom: 10px;">
        <strong style="color: #9DA4BD;">Arrival Time:</strong> Please arrive at the studio at least <strong>15 minutes</strong> before your scheduled appointment time.
      </li>
      <li style="margin-bottom: 10px;">
        <strong style="color: #9DA4BD;">Design Ideas:</strong> If you have any specific design ideas or references, please bring them with you.
      </li>
      <li style="margin-bottom: 10px;">
        <strong style="color: #9DA4BD;">Consultation:</strong> There will be a brief consultation before the tattooing begins.
      </li>
      <li style="margin-bottom: 10px;">
        <strong style="color: #9DA4BD;">ID and Age Requirement:</strong> Please bring a valid government-issued photo ID. You must be <strong>18 years or older</strong> to get a tattoo.
      </li>
      <li style="margin-bottom: 10px;">
        <strong style="color: #9DA4BD;">Cancellation Policy:</strong> Our cancellation policy states that the tattoo deposit is <strong>non-refundable</strong>. Rescheduling requires <strong>1 week's notice</strong>.
      </li>
    </ol>

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
      color: #fff;
      text-align: justify;">
      See you on <strong>${date}</strong>!
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
