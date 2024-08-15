"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
const db_1 = __importDefault(require("./db"));
const auth_1 = __importDefault(require("./routes/auth"));
const auth_2 = __importDefault(require("./middleware/auth"));
dotenv.config({
    path: './.env'
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
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
app.use('/api/auth', auth_1.default);
app.get('/api/welcome', auth_2.default, (req, res) => {
    res.send('Welcome to the application!');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
