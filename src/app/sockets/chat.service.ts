const socket = io('http://localhost?token=abc');

// server-side
const io = require('socket.io')();

// middleware
io.use((socket, next) => {
  let token = socket.handshake.query.token;
  if (isValid(token)) {
    return next();
  }
  return next(new Error('authentication error'));
});

// then
io.on('connection', (socket) => {
  let token = socket.handshake.query.token;
  // ...
});

const socket = io({
  transportOptions: {
    polling: {
      extraHeaders: {
        'x-clientid': 'abc'
      }
    }
  }
});

// server-side
const io = require('socket.io')();

// middleware
io.use((socket, next) => {
  let clientId = socket.handshake.headers['x-clientid'];
  if (isValid(clientId)) {
    return next();
  }
  return next(new Error('authentication error'));
});