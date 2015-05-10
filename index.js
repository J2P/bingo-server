var io = require('socket.io')();
var util = require('./util.js');
var users = {};
var colors = ['blue', 'green', 'red', 'orange', 'purple'];

io.on('connection', function(socket){
  socket.on('join', function(data) {
    users[data.user] = {
      board: util.getRandomNumbers(),
      color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0]
    };

    socket.emit('init', users[data.user]);
  });

  socket.on('send:number', function(data) {
    for (var user in users) {
      users[user]['board'] = util.setSelectNumbers(users[user]['board'], data.number);
      users[user]['lines'] = util.checkLines(users[user]['board']);
    }
    
    socket.emit('select:number', { users: users });  
  	socket.broadcast.emit('select:number', { users: users });
  });
});

io.listen(3000);