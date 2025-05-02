import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo3.png";

const SetUsername = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  // Function to handle the username submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Username validation: Only alphanumeric characters allowed
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      alert("Username can only contain letters and numbers.");
      return;
    }

    if (username.trim()) {
      console.log("Username set to:", username);

      // Set avatar using a random seed based on the username
      const avatarUrl = `https://api.dicebear.com/6.x/thumbs/svg?seed=${username}`;

      // Store username and avatar in localStorage
      localStorage.setItem("chatUsername", username);
      localStorage.setItem("chatAvatar", avatarUrl);

      // Navigate to room selection
      navigate("/room-selection");
    } else {
      alert("Please enter a valid username!");
    }
  };

  // Function to generate avatar preview based on the username
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    // Dynamically set the avatar URL based on username
    const newAvatar = `https://api.dicebear.com/6.x/thumbs/svg?seed=${newUsername}`;
    setAvatar(newAvatar);
  };

  return (
    <>
      <style>
        {`
          .set-username-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: #f4f6fa;
            padding: 20px;
          }

          .set-username-box {
            background-color: #ffffff;
            padding: 40px;
            width: 100%;
            max-width: 400px;
            border-radius: 20px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          .set-username-box h2 {
            margin-bottom: 20px;
            color: #333;
          }

          .set-username-box input {
            width: 100%;
            padding: 12px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
          }

          .set-username-box button {
            width: 100%;
            background-color: #4a90e2;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .set-username-box button:hover {
            background-color: #4078c0;
          }

          .set-username-box p {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
          } 
          
          .setusername-logo {
            width: 100px;
            height: auto;
            margin-bottom: 20px;
            transform: scale(1.4);
          }

          .avatar-preview {
            margin-top: 20px;
          }

          .avatar-preview img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
          }
        `}
      </style>

      <div className="set-username-container">
        <div className="set-username-box">
          <img src={Logo} alt="FlowTalk Logo" className="setusername-logo" />
          <h2>Pick a username 💬</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your cool username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <button type="submit">Continue</button>
          </form>
          <p>Your username will be visible in chats</p>

          {/* Avatar Preview */}
          {avatar && (
            <div className="avatar-preview">
              <img src={avatar} alt="Avatar Preview" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SetUsername;
