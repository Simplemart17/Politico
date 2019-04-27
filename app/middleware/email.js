import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const sendMail = (payload) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const options = {
    from: 'no-reply@politico.com',
    to: payload.email,
    subject: payload.subject,
    text: payload.message,
  };
  return sgMail.send(options);
};

export default sendMail;
