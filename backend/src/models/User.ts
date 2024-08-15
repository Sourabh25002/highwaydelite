import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  otp: string | null;
  isVerified: boolean;
  firstName: string; // Added firstName
  lastName: string;  // Added lastName
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
  firstName: { type: String, required: true }, // Added firstName
  lastName: { type: String, required: true },  // Added lastName
});

export default mongoose.model<IUser>('User', UserSchema);
