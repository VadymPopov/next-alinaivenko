'use server';

import nodemailer from 'nodemailer';

export async function getTransporter() {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    // add ssl certificate in production
    // secure: true,
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  return transporter;
}
