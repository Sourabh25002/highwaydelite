import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import eyeIcon from "../svg/eye.svg";
import eyeSlashIcon from "../svg/eyecross.svg";
import arrowIcon from "../svg/arrow.svg"; // Import the arrow icon

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>(""); // Track retype password
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [retypePasswordVisible, setRetypePasswordVisible] =
    useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [contactMode, setContactMode] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // State to store error messages

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRetypePasswordVisibility = () => {
    setRetypePasswordVisible(!retypePasswordVisible);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectContactMode = (mode: string) => {
    setContactMode(mode);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Reset error state before submission

    // Validate if passwords match
    if (password !== retypePassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await axios.post(
        "https://highwaydelite-d2lt.onrender.com/api/auth/signup",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Redirect to the OTP verification page on successful signup
        navigate("/OtpVerification");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      // Set error message from backend if available, otherwise set a default message
      setError(
        error.response?.data?.message ||
          "An error occurred during signup. Please try again."
      );
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src="img1.jpg" alt="Signup" />
      </div>
      <div className="signup-form">
        <div className="signup-header">
          <h2 className="bold-text">
            <span className="text-primary">Let us know</span>
            <span className="text-highlight">!</span>
          </h2>
          <a href="/signin" className="signin-link">
            <span className="text-primary">Sign </span>
            <span className="text-highlight">In</span>
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Set Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={passwordVisible ? eyeSlashIcon : eyeIcon}
              alt="Toggle Password Visibility"
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="password-container">
            <input
              type={retypePasswordVisible ? "text" : "password"}
              placeholder="Retype Password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
            />
            <img
              src={retypePasswordVisible ? eyeSlashIcon : eyeIcon}
              alt="Toggle Password Visibility"
              className="password-toggle-icon"
              onClick={toggleRetypePasswordVisibility}
            />
          </div>
          <div className="contact-container">
            <input
              type="text"
              placeholder="Contact Mode"
              value={contactMode}
              readOnly
            />
            <img
              src={arrowIcon}
              alt="Toggle Dropdown"
              className="contact-icon"
              onClick={toggleDropdown}
            />
            <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
              <li onClick={() => selectContactMode("Email")}>Email</li>
              <li onClick={() => selectContactMode("Phone")}></li>
            </ul>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        {/* Display error message if it exists */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
