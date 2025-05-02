import React, { useState } from "react";
import Logo from '../assets/logo3.png'; // ✅ if in /pages folder

import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/set-username");
    } catch (error) {
      console.error("Signup Error:", error.message);
      alert(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/set-username");
    } catch (err) {
      console.error("Google Sign Up Error", err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
      <img src={Logo} alt="FlowTalk Logo" className="login-logo" />

        <h2>Sign Up to FlowTalk 💬</h2>

        <button className="google-btn" onClick={handleGoogleSignUp}>
          <img src="https://img.icons8.com/color/16/google-logo.png" alt="G" />
          Sign up with Google
        </button>

        <div className="divider"><span>OR</span></div>

        <form onSubmit={handleEmailSignUp}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button type="submit">Continue</button>
        </form>

        <p>
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
