import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectRoom.css'; // we will make this

const rooms = [
  { name: 'General', icon: '🗣️' },
  { name: 'Work', icon: '💼' },
  { name: 'Gaming', icon: '🎮' },
  { name: 'Study', icon: '📚' },
];

const SelectRoom = () => {
  const navigate = useNavigate();

  const handleSelectRoom = (roomName) => {
    localStorage.setItem('selectedRoom', roomName); // Save selected room
    navigate('/chatroom'); // Redirect to ChatRoom.js
  };

  return (
    <div className="select-room-container">
      <h2 className="select-room-heading">Select a Room to Join</h2>
      <div className="rooms-grid">
        {rooms.map((room, index) => (
          <div 
            key={index} 
            className="room-card" 
            onClick={() => handleSelectRoom(room.name)}
          >
            <span className="room-icon">{room.icon}</span>
            <h3>{room.name} Room</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectRoom;
