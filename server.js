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

const users = {};
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('new-user', (name) => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connection', name);
    socket.broadcast.emit('users', users[socket.id]);
    console.log(users[socket.id])
  });

  socket.on('message', (message) => {
    const userMessage = { message, name: users[socket.id] };
    socket.broadcast.emit('display-message', userMessage);
    socket.emit('user-message', userMessage);
  });

  socket.on('disconnect', () => {
    const name = users[socket.id];
    delete users[socket.id];
    console.log('User disconnected');
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
