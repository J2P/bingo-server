var io = require("socket.io")();
var uuidv4 = require("uuid/v4");
var util = require("./lib/util.js");
var users = {};

io.on("connection", function(socket) {
  socket.on("join", function(data) {
    var id = uuidv4();
    users[id] = {
      id: id,
      board: util.getRandomBoard(),
      color: util.getRandomColor()
    };

    socket.emit("init", users[id]);
    socket.broadcast.emit("update:user", { users: users });
  });

  socket.on("send:number", function(data) {
    for (var user in users) {
      users[user]["board"] = util.setSelectNumbers(
        users[user]["board"],
        data.number
      );
      users[user]["lines"] = util.checkLines(users[user]["board"]);
    }

    socket.emit("select:number", { users: users });
    socket.broadcast.emit("select:number", { users: users });
  });
});

io.listen(4000);
