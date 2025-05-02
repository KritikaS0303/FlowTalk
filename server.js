import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';

// MongoDB Message schema
const messageSchema = new mongoose.Schema({
  room: String,
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

// Initialize Express app
const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chatApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection failed:', err));

// Create HTTP server and socket.io server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'],
});

// Data holders
let users = [];
let availableRooms = [];

// Socket.IO connection
io.on('connection', (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.emit('available rooms', availableRooms);

  // Handle username setup
  socket.on('set username', (username) => {
    const usernameTaken = users.some((u) => u.username === username);
    if (usernameTaken) {
      socket.emit('username taken', username);
    } else {
      socket.username = username;
      users.push({ username, socketId: socket.id });
      socket.emit('username set', username);
      io.emit('update users', users);
      socket.broadcast.emit('user joined', username);
    }
  });

  // Join room and send previous messages
  socket.on('join room', async (room) => {
    socket.join(room);
    const username = socket.username || 'Anonymous';

    console.log(`🛜 ${username} joined room: ${room}`);

    if (!availableRooms.includes(room)) {
      availableRooms.push(room);
      io.emit('available rooms', availableRooms);
    }

    try {
      const messages = await Message.find({ room }).sort({ timestamp: 1 });
      socket.emit('previous messages', messages);
    } catch (err) {
      console.error(`❌ Error fetching messages:`, err);
    }

    socket.to(room).emit('user joined', username); // Emit to room that user joined
  });

  // Handle sending messages
  socket.on('chat message', async ({ room, message }) => {
    const username = socket.username || 'Anonymous';

    try {
      const newMessage = new Message({ room, username, message });
      await newMessage.save();

      // Emit the message to everyone in the room
      io.to(room).emit('chat message', { username, message, room, timestamp: newMessage.timestamp });

    } catch (err) {
      console.error('❌ Error saving message:', err);
    }
  });

  // Typing indicators scoped to room
  socket.on('typing', ({ room }) => {
    if (room) {
      socket.to(room).emit('typing', socket.username);
    } else {
      console.error('❌ Typing event missing room data');
    }
  });

  // User disconnect
  socket.on('disconnect', () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
    const username = socket.username;

    users = users.filter((u) => u.socketId !== socket.id);
    io.emit('update users', users);

    socket.broadcast.emit('user left', username);

    // Clean up empty rooms
    availableRooms = availableRooms.filter((room) => {
      const roomInfo = io.sockets.adapter.rooms.get(room);
      return roomInfo && roomInfo.size > 0;
    });
    io.emit('available rooms', availableRooms);
  });

  // Respond with current online users
  socket.on('request online users', () => {
    socket.emit('update users', users);
  });
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
