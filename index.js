const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const utils = require('./lib/utils');

const port = 4000;
const rooms = [];

io.on("connection", (socket) => {
  const id = socket.id;

  socket.on('join room', () => {
    const lastRoom = rooms[rooms.length - 1];
    // 방이 하나도 없는 경우 또는 마지막 방에 인원이 꽉 찬경우 새로운 방을 만든다.
    if (rooms.length === 0 || lastRoom.users.length === 2) {
      const ROOM_NAME = `room${rooms.length}`;
      socket.join(ROOM_NAME, () => {
        const users = [];
        users.push({ 
          id,
          board: utils.getRandomBoard(),
          color: utils.getRandomColor(),
          lines: []
        });
        const room = { name: ROOM_NAME, users };
        rooms.push(room);
    
        io.to(ROOM_NAME).emit('join room', room);
      });
    } else {
      // 마지막 방에 사람이 1명이면
      const lastRoom = rooms[rooms.length - 1];
      const ROOM_NAME = lastRoom.name;

      socket.join(ROOM_NAME, () => {
        const room = rooms.filter(room => room.name === ROOM_NAME);
        const users = room[0].users;
        const user = users.filter(user => user.id === id);
        if (user.length === 0) {
          room[0].users.push({ 
            id,
            board: utils.getRandomBoard(),
            color: utils.getRandomColor(),
            lines: []
          });
        }
  
        io.to(ROOM_NAME).emit('join room', room[0]);
      });
    }

    socket.on('send:number', (id, number, name) => {
      const room = rooms.filter(room => room.name === name)[0];
      const users = room.users;

      users.map(user => {
        const board = utils.setSelectNumbers(user.board, number);
        const lines = utils.checkLines(board);
        user.board = board;
        user.lines = lines;
      });
  
      io.to(name).emit('select:number', users);
    });
  });

  socket.on('disconnect', () => {
    // rooms.forEach(room => {
    //   console.log('disconnect >>>>', room);
    //   const index = room.users.findIndex(user => user.id === socket.id);
    //   console.log("index", index)
    //   index > -1 && room.users.splice(index, 1);
    // });
    console.log('user disconnect');
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`))
