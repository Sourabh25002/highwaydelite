import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Otp.css";

const OtpVerification: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://highwaydelite-d2lt.onrender.com/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (response.ok) {
        // OTP verification successful
        alert("OTP verified successfully!");
        navigate("/home"); // Redirect to the home page
      } else {
        // Handle OTP verification failure
        const result = await response.json();
        setError(result.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-form">
        <h2 className="otp-header">OTP Verification</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="otp-input"
            required
          />
          <input
            type="text"
            placeholder="Enter OTP"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="otp-input"
            required
          />
          <button type="submit" className="verify-button">
            Verify OTP
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
