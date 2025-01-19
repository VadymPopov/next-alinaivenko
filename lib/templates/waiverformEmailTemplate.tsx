interface WaiverFormEmailParams {
  name: string;
  email: string;
  phone?: string;
  appointmentDate: string;
  address: string;
}

export function generateWaiverFormEmail({
  name,
  email,
  phone,
  address,
  appointmentDate,
}: WaiverFormEmailParams) {
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
      Waiver - ${name}
    </h2>

    <h3 style="
      color: #fff;
      font-size: 18px;
      text-align: left;
      margin-bottom: 10px;
      margin-top: 30px;">
      Client Information
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
          background-color: #fff;
          border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">
            Name:
          </td>
          <td style="padding: 10px; text-align: right;">
            ${name}
          </td>
        </tr>
        <tr style="
          background-color: #f7f7f7;
          border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">
            Email:
          </td>
          <td style="padding: 10px; text-align: right;">
            ${email}
          </td>
        </tr>
        ${
          phone
            ? `<tr style="
          background-color: #f7f7f7;
          border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">
            Phone:
          </td>
          <td style="padding: 10px; text-align: right;">
            ${phone}
          </td>
        </tr>`
            : ''
        }
        
        <tr style="
          background-color: #f7f7f7;
          border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">
            Date:
          </td>
          <td style="padding: 10px; text-align: right;">
            ${appointmentDate}
          </td>
        </tr>
        <tr style="
          background-color: #f7f7f7;
          border-bottom: 1px solid #303030;">
          <td style="padding: 10px; font-weight: bold; text-align: left;">
            Address:
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
      Please find waiver in the attachments.
    </h3>
    
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
