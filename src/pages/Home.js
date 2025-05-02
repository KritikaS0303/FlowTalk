import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from '../assets/logo3.png';

function Home() {
  return (
    <div className="home-container">
      {/* Background Chat Bubbles */}
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>

      {/* Header */}
      <header className="header fade-in">
        <div className="logo">
          <img src={logo} alt="FlowTalk Logo" className="logo-img" />
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/signup" className="btn signup-btn">Sign Up</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section glass">
        <h1 className="fade-in">Welcome to <span className="highlight">FlowTalk</span></h1>
        <p className="tagline">Chat instantly with friends in real time — safe, secure, and fast!</p>
        <div className="cta-buttons">
          <Link to="/join-chat" className="cta-btn start-btn">Get Started</Link>
          <Link to="/learn-more" className="cta-btn learn-btn">Learn More</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer fade-in">
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <p>© 2025 FlowTalk</p>
      </footer>
    </div>
  );
}

export default Home;
