import 'dotenv/config';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const { SEND_MAIL_USER, SEND_MAIL_PASS, SEND_MAIL_HOST, SEND_MAIL_PORT } =
  process.env;

if (!SEND_MAIL_USER || !SEND_MAIL_PASS || !SEND_MAIL_HOST || !SEND_MAIL_PORT) {
  throw new Error('Missing environment variables for email configuration');
}

const config: SMTPTransport.Options = {
  host: SEND_MAIL_HOST,
  port: parseInt(SEND_MAIL_PORT, 10),
  secure: true,
  auth: {
    user: SEND_MAIL_USER,
    pass: SEND_MAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

interface EmailData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const sendHelp = (data: EmailData) => {
  const email = { ...data, from: SEND_MAIL_USER };
  return transporter.sendMail(email);
};

export default sendHelp;
