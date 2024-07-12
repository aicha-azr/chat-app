const io = require('socket.io')(3000, {
    cors: {
      origin: '*', // Allows all origins. You can restrict this to specific origins if needed.
      methods: ['GET', 'POST']
    }
  });
  const users = {}
  io.on('connection', socket => {
    console.log('new user');
    socket.emit('chat-message', 'hello world!');
    socket.on('send-chat-message', message =>{
        console.log(message)
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('new-user', name =>{
        users[socket.id] = name
        socket.broadcast.emit('user-connecton', message)
    })
  });
  