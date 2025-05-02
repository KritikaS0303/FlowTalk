import React, { useState } from "react";
import GoogleIcon from '../assets/login-with-google.png';

import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.js";
import "./Login.css";
import Logo from '../assets/logo3.png'; // ✅ if in /pages folder

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google login success:", result.user);
        navigate("/set-username");
      })
      .catch((error) => console.error("Google login error:", error));
  };

  const handleAppleLogin = () => {
    // Placeholder for future Apple login functionality if needed
    console.log("Apple login functionality coming soon!");
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    console.log("Email entered:", email);
    navigate("/set-username");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={Logo} alt="FlowTalk Logo" className="login-logo" />

        <h2>Log in</h2>

        <button className="login-btn google" onClick={handleGoogleLogin}>
          <img src={GoogleIcon} alt="Google" className="google-icon" />
          Continue with Google
        </button>

        <button className="login-btn apple" onClick={handleAppleLogin}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
            alt="Apple" 
          />
          Continue with Apple
        </button>

        <div className="or-divider"><span>OR</span></div>

        <form onSubmit={handleEmailLogin}>
          <input
            autoFocus
            type="email"
            placeholder="name@work-email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="email-btn">Continue with email</button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <span className="link" onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
