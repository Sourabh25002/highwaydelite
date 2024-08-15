import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import connectDB from './db';
import authRoutes from './routes/auth';
import auth from './middleware/auth';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

dotenv.config({
  path: './.env'
});

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// (async () => {
//   try {
//     // Replace with actual user email for testing
//     const userEmail = 'sourabh25002@gmail.com'; // Change this to the recipient's email

//     // Email credentials from environment variables
//     const EMAIL = process.env.EMAIL_USER;
//     const PASSWORD = process.env.EMAIL_PASS;

//     // Configure Nodemailer transport
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: EMAIL,
//         pass: PASSWORD
//       }
//     });

//     // Create Mailgen instance
//     const MailGenerator = new Mailgen({
//       theme: 'default',
//       product: {
//         name: 'Mailgen',
//         link: 'https://mailgen.js/'
//       }
//     });

//     // Define email content
//     const response = {
//       body: {
//         name: 'Daily Tuition',
//         intro: 'Your bill has arrived!',
//         table: {
//           data: [
//             {
//               item: 'Nodemailer Stack Book',
//               description: 'A Backend application',
//               price: '$10.99'
//             }
//           ]
//         },
//         outro: 'Looking forward to do more business'
//       }
//     };

//     // Generate HTML email content
//     const mail = MailGenerator.generate(response);

//     // Define message
//     const message = {
//       from: EMAIL,
//       to: userEmail,
//       subject: 'Place Order',
//       html: mail
//     };

//     // Send email
//     await transporter.sendMail(message);
//     console.log('You should receive an email');
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error sending email:', error.message);
//     } else {
//       console.error('An unknown error occurred:', error);
//     }
//   }
// })();

// (async () => {
//   try {
//     // Create a test account for Ethereal
//     let testAccount = await nodemailer.createTestAccount();

//     // Connect with the SMTP server
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       auth: {
//         user: 'elody62@ethereal.email', // Replace with the test account user
//         pass: 'gSVRbaGMh9DzhkNSSd', // Replace with the test account password
//       },
//     });

//     // Send mail
//     let info = await transporter.sendMail({
//       from: '"Vinod Thapa 👻" <sourabh25002@gmail.com>', // sender address
//       to: 'sourabh25002@gmail.com', // list of receivers
//       subject: 'Hello Thapa', // Subject line
//       text: 'Hello YT Thapa', // plain text body
//       html: '<b>Hello YT Thapa</b>', // html body
//     });

//     console.log('Message sent: %s', info.messageId);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error sending email:', error.message);
//     } else {
//       console.error('An unknown error occurred:', error);
//     }
//   }
// })();

app.use('/api/auth', authRoutes);

app.get('/api/welcome', auth, (req, res) => {
  res.send('Welcome to the application!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
