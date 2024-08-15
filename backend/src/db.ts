import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI: string | undefined = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in the environment variables.');
    }

    // console.log("MongoDB URI:", mongoURI); // Log MongoDB URI
    
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", (error as Error).message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
