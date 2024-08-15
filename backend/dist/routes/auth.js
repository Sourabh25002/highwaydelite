"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const emailService_1 = require("../services/emailService");
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = req.body;
    console.log(req.body);
    try {
        // Check if all required fields are provided
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }
        // Check if the user already exists
        const userExists = yield User_1.default.findOne({ email });
        if (userExists)
            return res.status(400).json({ msg: 'User already exists' });
        // Hash the password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Create a new user
        const newUser = new User_1.default({
            email,
            password: hashedPassword,
            otp,
            firstName,
            lastName,
        });
        // Save the user
        yield newUser.save();
        // Send OTP email
        try {
            yield (0, emailService_1.sendOTP)(email, otp);
            res.status(200).json({ msg: 'OTP sent to your email' });
        }
        catch (emailError) {
            // Type assertion to Error
            const err = emailError;
            console.error('Error sending OTP:', err.message);
            res.status(500).json({ msg: 'Failed to send OTP' });
        }
    }
    catch (error) {
        // Type assertion to Error
        const err = error;
        console.error('Signup error:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
}));
router.post('/verify-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    console.log(req.body);
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: 'Invalid email' });
        if (user.otp !== otp)
            return res.status(400).json({ msg: 'Invalid OTP' });
        user.isVerified = true;
        user.otp = null;
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: 'Invalid email' });
        if (!user.isVerified)
            return res.status(400).json({ msg: 'Email not verified' });
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: 'Invalid password' });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}));
exports.default = router;
