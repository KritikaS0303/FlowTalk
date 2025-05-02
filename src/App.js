import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import ChatRoom from "./pages/ChatRoom.js";
import SignUp from "./pages/SignUp.js";
import Login from "./pages/Login.js";
import SetUsername from './pages/SetUsername.js';
import RoomSelection from './pages/RoomSelection.js';
import Home from './pages/Home.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/set-username" element={<SetUsername />} />
        <Route path="/room-selection" element={<RoomSelection />} /> {/* Corrected */}
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
