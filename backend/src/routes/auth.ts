import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { sendOTP } from '../services/emailService';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  console.log(req.body);

  try {
    // Check if all required fields are provided
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      otp,
      firstName,
      lastName,
    });

    // Save the user
    await newUser.save();
    
    // Send OTP email
    try {
      await sendOTP(email, otp);
      res.status(200).json({ msg: 'OTP sent to your email' });
    } catch (emailError) {
      // Type assertion to Error
      const err = emailError as Error;
      console.error('Error sending OTP:', err.message);
      res.status(500).json({ msg: 'Failed to send OTP' });
    }

  } catch (error) {
    // Type assertion to Error
    const err = error as Error;
    console.error('Signup error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});



router.post('/verify-otp', async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email' });
    if (user.otp !== otp) return res.status(400).json({ msg: 'Invalid OTP' });

    user.isVerified = true;
    user.otp = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email' });
    if (!user.isVerified) return res.status(400).json({ msg: 'Email not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});


export default router;
