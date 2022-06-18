const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
app.get('/', (req, res) => {
  return '<h1>Hello World</h1>'
});


server.listen(3001, () => {
  console.log('listening on *:3001');
});