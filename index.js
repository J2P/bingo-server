const io = require("socket.io")();
const util = require("./lib/util.js");
let users = {};
let roomNumber = 0;

function roomCount(rooms) {
  let count = 0;
  for (room in rooms) {
    if (room.indexOf("room") === 0) {
      count++;
    }
  }

  return count;
}

io.on("connection", function(socket) {
  socket.emit("connected");
  const rooms = io.sockets.adapter.rooms;

  socket.on("disconnect", function() {
    socket.emit("disconnect");
  });

  socket.on("join", function(data) {
    let isJoin = false;
    let roomName = "";
    const id = socket.id;

    if (roomCount(rooms) === 0) {
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

    socket.emit("init", users[id]);
  });

  socket.on("send:number", function(data) {
    for (user in rooms[data.roomName].sockets) {
      users[user]["board"] = util.setSelectNumbers(
        users[user]["board"],
        data.number
      );
      users[user]["lines"] = util.checkLines(users[user]["board"]);
    }

    socket.emit("select:number", { users: users });
    io.sockets.in(data.roomName).emit("select:number", { users: users });
  });
});

io.listen(4000);
