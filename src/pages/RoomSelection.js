import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo3.png"; // Replace with your logo path

const RoomSelection = () => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const navigate = useNavigate();

  // Handle room selection
  const handleRoomSelect = () => {
    if (selectedRoom) {
      // Store the room selection in localStorage
      localStorage.setItem("selectedRoom", selectedRoom);

      // Navigate to the chat room
      navigate("/chatroom");
    } else {
      alert("Please select a room!");
    }
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', sans-serif;
            background-color: #f7f9fc; /* Background color for the whole page */
            overflow: hidden;
            height: 100vh;
          }

          /* Fullscreen Background and Floating Bubbles */
          .bubble {
            position: absolute;
            border-radius: 50%;
            opacity: 0.3;
            animation: float 6s ease-in-out infinite;
            z-index: 0;
          }

          .bubble1 {
            width: 200px;
            height: 200px;
            background-color: #00bfff;
            top: 10%;
            left: 5%;
          }

          .bubble2 {
            width: 150px;
            height: 150px;
            background-color: #ff69b4;
            bottom: 15%;
            right: 10%;
          }

          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }

          .fullscreen-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #e0eafc, #cfdef3);
            z-index: -1;
          }

          /* Container for centering the room selection box */
          .room-selection-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            padding: 20px;
            position: relative;
            z-index: 1;
          }

          /* Room Selection Box */
          .room-selection-box {
            background-color: #ffffff;
            padding: 40px;
            width: 100%;
            max-width: 450px;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            text-align: center;
            position: relative;
            z-index: 2;
          }

          .room-selection-box:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            transform: translateY(-5px);
          }

          /* Logo */
          .room-selection-logo {
            width: 120px;
            margin-bottom: 20px;
            transition: transform 0.3s ease;
          }

          .room-selection-logo:hover {
            transform: scale(1.1);
          }

          .room-selection-box h2 {
            margin-bottom: 20px;
            font-size: 28px;
            font-weight: bold;
            color: #333;
          }

          .room-selection-box p {
            font-size: 16px;
            color: #777;
            margin-bottom: 25px;
          }

          select {
            width: 100%;
            padding: 12px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
          }

          .room-selection-button {
            background-color: #4a90e2;
            color: white;
            padding: 14px 35px;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
            display: inline-block;
          }

          .room-selection-button:hover {
            background-color: #357ae8;
            transform: translateY(-2px);
          }

          .room-selection-button:active {
            transform: translateY(1px);
          }

          .room-selection-button:focus {
            outline: none;
          }
        `}
      </style>

      {/* Fullscreen background with bubbles */}
      <div className="fullscreen-background">
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
      </div>

      {/* Room selection input box */}
      <div className="room-selection-container">
        <div className="room-selection-box">
          <img src={Logo} alt="FlowTalk Logo" className="room-selection-logo" />
          <h2>Select Your Chat Room</h2>
          <p>Choose a room below to start chatting</p>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="">-- Select a Room --</option>
            <option value="General">General</option>
            <option value="Gaming">Gaming</option>
            <option value="Study">Study</option>
          </select>
          <button className="room-selection-button" onClick={handleRoomSelect}>
            Join Room
          </button>
        </div>
      </div>
    </>
  );
};

export default RoomSelection;
