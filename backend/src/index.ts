import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import connectDB from './db';
import authRoutes from './routes/auth';
import auth from './middleware/auth';

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

app.use('/api/auth', authRoutes);

app.get('/api/welcome', auth, (req, res) => {
  res.send('Welcome to the application!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
