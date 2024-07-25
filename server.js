const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected');

  // Listen for incoming messages
  socket.on('message', (message) => {
    console.log('Message:', message);
    // Broadcast the message to all connected clients
    socket.broadcast.emit('display-message', message);
    socket.emit('user-message', message);
  });
  socket.on('new-user', name =>{ 
    socket.broadcast.emit('user-connection', name);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
