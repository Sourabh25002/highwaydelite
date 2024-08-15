import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import eyeIcon from "../svg/eye.svg";
import eyeSlashIcon from "../svg/eyecross.svg";

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignInClick = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Sign-in successful
        navigate("/home");
      } else {
        // Handle sign-in failure
        const result = await response.json();
        setError(
          result.message || "Invalid email or password. Please try again."
        );
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src="img2.jpg" alt="Signup" />
      </div>
      <div className="signup-form">
        <div className="signup-header">
          <h2 className="bold-text">
            <span className="text-primary">Fill what we know</span>
            <span className="text-highlight">!</span>
          </h2>
        </div>
        <form onSubmit={handleSignInClick}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
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
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="sign-up-button"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signin;
