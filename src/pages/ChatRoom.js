import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Send, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

import './ChatRoom.css';

const ChatRoom = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [room, setRoom] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);

  const socketRef = useRef(null);
  const chatBoxRef = useRef(null);
  const typingTimeout = useRef(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('chatUsername');
    const savedRoom = localStorage.getItem('chatRoom');

    if (!savedUsername) {
      alert('No username found! Please login again.');
      window.location.href = '/set-username';
      return;
    }

    if (savedRoom) {
      setRoom(savedRoom);
    }

    setUsername(savedUsername);

    socketRef.current = io('http://localhost:5001', {
      transports: ['websocket'],
    });
    
    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected as:', socket.id);
      socket.emit('set username', savedUsername);  // Emitting the username from localStorage
      socket.emit('join room', savedRoom);         // Joining the room
    });

    socket.on('chat message', (data) => {
      addMessageToState(data); // This updates messages state
    });

    socket.on('typing', (user) => setTypingUser(user));
    socket.on('stop typing', () => setTypingUser(''));

    socket.on('user joined', (data) => {
      addMessageToState({
        system: true,
        text: `${data.username} joined the chat.`,
      });
    });

    socket.on('user left', (leftUsername) => {
      addMessageToState({
        system: true,
        text: `${leftUsername} left the chat.`,
      });
    });

    socket.on('username set', () => {
      addMessageToState({ system: true, text: `You joined the chat.` });
    });

    socket.on('update users', (users) => {
      setOnlineUsers(users);
    });

    socket.on('available rooms', (rooms) => {
      setAvailableRooms(rooms);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  useEffect(() => {
    loadMessagesForRoom();
  }, [room]);

  const handleSend = () => {
    if (!message.trim()) return;

    const data = {
      username,
      message,
      time: getTime(),
      room,
    };

    socketRef.current.emit('chat message', data);
    
    setMessage('');
    socketRef.current.emit('stop typing', { room });
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    socketRef.current.emit('typing', { room, username }); // Include room and username
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socketRef.current.emit('stop typing', { room }); // Include room when emitting stop typing
    }, 1000);
  };

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const addMessageToState = (msgObj) => {
    setMessages((prev) => {
      const updated = [...prev, msgObj];
      saveMessagesForRoom(updated);
      return updated;
    });
  };

  const saveMessagesForRoom = (msgs) => {
    try {
      const allMessages = JSON.parse(localStorage.getItem('chatMessagesByRoom')) || {};
      allMessages[room] = msgs;
      localStorage.setItem('chatMessagesByRoom', JSON.stringify(allMessages));
    } catch (error) {
      console.error('Error saving room messages:', error);
    }
  };

  const loadMessagesForRoom = () => {
    try {
      const allMessages = JSON.parse(localStorage.getItem('chatMessagesByRoom')) || {};
      setMessages(allMessages[room] || []);
    } catch (error) {
      console.error('Error loading room messages:', error);
    }
  };

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleDeleteMessage = (index) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages.splice(index, 1);
        saveMessagesForRoom(newMessages);
        return newMessages;
      });
    }
  };

  const handleRoomChange = (e) => {
    const selectedRoom = e.target.value;
    setRoom(selectedRoom);
    localStorage.setItem('chatRoom', selectedRoom);
    socketRef.current.emit('join room', selectedRoom); // Emitting to join the new room
    setMessages([]); // Clear the messages when the room changes
    loadMessagesForRoom(); // Load messages for the new room
    socketRef.current.emit('request online users', selectedRoom); // Request the online users for the new room
  };

  return (
    <div className={`chatroom-container ${darkMode ? 'dark' : ''}`}>
      <h2 className="logo-heading">FlowTalk 💬</h2>

      <button className="dark-mode-toggle" onClick={() => setDarkMode((prev) => !prev)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <div className="room-selection">
        <h4>Select Room:</h4>
        <select value={room} onChange={handleRoomChange}>
          <option value="">Select a Room</option>
          {availableRooms.map((roomName, index) => (
            <option key={index} value={roomName}>
              {roomName}
            </option>
          ))}
        </select>
      </div>

      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) =>
          msg.system ? (
            <div className="system-message" key={index}>
              <span className="system-message-text">{msg.text}</span>
            </div>
          ) : (
            <div
              key={index}
              className={`message ${msg.username === username ? 'own-message' : 'other-message'}`}
            >
              <div className="message-content">
                <span className="message-username">{msg.username}</span>
                <span className="message-text">{msg.message}</span>
                <span className="timestamp">{msg.time}</span>
              </div>
              {msg.username === username && (
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteMessage(index)}
                >
                  🗑️
                </button>
              )}
            </div>
          )
        )}
      </div>

      <div className="typing">{typingUser && <span>{typingUser} is typing...</span>}</div>

      <div className="input-area">
        <button className="emoji-toggle" onClick={() => setShowEmojiPicker((prev) => !prev)}>
          <Smile size={24} />
        </button>

        {showEmojiPicker && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme={darkMode ? 'dark' : 'light'} />
          </div>
        )}

        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleTyping}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />

        <button className="send-icon-btn" onClick={handleSend}>
          <Send size={22} />
        </button>
      </div>

      <div className="online-users">
        <h4>Online Users:</h4>
        <ul>
          {onlineUsers.map((user, index) => (
            <li key={index}>
              <span className="status-dot" /> {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatRoom;
