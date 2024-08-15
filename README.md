# Highway Delite Assignment

This is a full-stack application featuring a signup flow with email OTP verification, login functionality, and a welcome page. The application follows best practices for authentication and is designed to be mobile-friendly, replicating the design provided in the Figma link.

## Features

1. Signup Flow with Email OTP Verification
   * Users can sign up by entering their email and password.
   * An OTP is sent to the email for verification.
   * Displays relevant error messages for incorrect OTP or API failures.

2. Login Flow
   * Users can log in using their email and password.
   * Upon successful login, users are redirected to a welcome page.

3. Welcome Page
   * Displayed after successful signup or login.

4. Mobile-Friendly Design
   * The application is designed to be responsive and replicate the Figma design provided.

5. Security Best Practices
   * Password hashing using bcrypt.
   * JWT (JSON Web Token) for authentication.

# Technology Stack

* Front-end: ReactJS (TypeScript)
* Backend: Node.js (TypeScript)
* Database: MongoDB
* Version Control: Git

# Setup and Installation

Prerequisites

* Node.js and npm installed on your machine.
* MongoDB database setup.
* Git for version control.

Clone the Repository

* git clone https://github.com/Sourabh25002/highwaydelite.git

Install Dependencies

* Navigate to the root directory of both the front-end and back-end projects and run: npm install


Environment Variables

Create a `.env` file in back-end directorie and add the necessary environment variables:

* PORT=4000
* MONGO_URI=<your-mongodb-uri>
* JWT_SECRET=<your-jwt-secret>
* EMAIL_SERVICE=<your-email-service>
* EMAIL_USER=<your-email-user>
* EMAIL_PASS=<your-email-password>

# Run the Application

* Backend: cd backend -> npm run dev
* Frontend: cd frontend -> npm start

# Deployment

Deploy the project to a cloud provider of your choice (e.g., Heroku, AWS, Azure) and share the live URL.

