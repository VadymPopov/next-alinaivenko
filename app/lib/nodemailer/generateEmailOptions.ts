interface generateEmailOptionsI {
  to: string;
  subject: string;
  htmlContent: string;
  attachments?: { path: string }[];
  logoPath: string;
}

export function generateEmailOptions({
  to,
  subject,
  htmlContent,
  attachments = [],
  logoPath,
}: generateEmailOptionsI) {
  return {
    from: 'inkedbyalina@gmail.com',
    to,
    subject,
    html: htmlContent,
    attachments: [
      {
        filename: 'email-logo.png',
        path: logoPath,
        cid: 'logo',
        contentType: 'image/png',
      },
      ...attachments,
    ],
  };
}
