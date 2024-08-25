const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create an Express application
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "https://4a583729-95de-4140-aed0-c461f5574797-00-fp09fx5z391b.picard.replit.dev/", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  }
});

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  // Handle events
  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
