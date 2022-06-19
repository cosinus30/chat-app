const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  return '<h1>Hello World</h1>'
});

io.on('connection', (socket) => {
  console.log('a user connected with id: ', socket.id);
  socket.on('disconnect', () => {
    console.log('User is disconnected');
  })
  socket.on('chat message', (msg) => {
    console.log('message: ', msg)
    socket.broadcast.emit('chat message', msg)
  })

  socket.on('typing', (isTyping) => {
    console.log('typing...')
    socket.broadcast.emit('typing', isTyping)
  })

});

server.listen(3001, () => {
  console.log('listening on *:3001');
});