const express = require('express');
const http = require('http');
const socketIO = require("socket.io");
const util = require("./lib/util.js");
let users = {};
let roomNumber = 0;

const port = 4000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  const id = socket.id;
  const rooms = io.sockets.adapter.rooms;
  let isJoin = false;
  let roomName = '';
  
  if (util.roomCount(rooms) === 0) {
    roomName = `room${roomNumber}`;
    socket.join(roomName);
  } else {
    for (room in rooms) {
      if (room.indexOf("room") === 0 && rooms[room].length < 2) {
        roomName = room;
        socket.join(roomName);
        isJoin = true;
      }
    }

    if (!isJoin) {
      roomName = `room${++roomNumber}`;
      socket.join(roomName);
    }
  }

  users[id] = {
    id: id,
    board: util.getRandomBoard(),
    color: util.getRandomColor(),
    roomName: roomName
  };
  console.log(users[id]);
  socket.emit('init', users[id]);

  socket.on('disconnect', function() {
    console.log('user disconnect');
  });

  socket.on('send:number', function(data) {
    for (user in rooms[data.roomName].sockets) {
      users[user]['board'] = util.setSelectNumbers(
        users[user]['board'],
        data.number
      );
      users[user]['lines'] = util.checkLines(users[user]['board']);
    }

    socket.emit('select:number', { users: users });
    io.sockets.in(data.roomName).emit('select:number', { users: users });
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`))
