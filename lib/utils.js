var colors = ["blue", "green", "red", "orange", "purple"];

function getRandomBoard() {
  var cells = [];
  var numbers = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25
  ];

  for (var i = 0; i < 25; i++) {
    cells.push({
      id: i + 1,
      selected: false,
      value: numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]
    });
  }
  return cells;
}

function setSelectNumbers(userBoard, number) {
  var board = [];

  for (var i = 0; i < userBoard.length; i++) {
    board.push({
      id: userBoard[i].id,
      selected: userBoard[i].value == number ? true : userBoard[i].selected,
      value: userBoard[i].value
    });
  }

  return board;
}

function selectedConfirm(cells) {
  var confirm = true;
  cells.forEach(function(cell) {
    if (!cell.selected) {
      confirm = false;
    }
  });

  return confirm;
}

function resetColor() {
  colors = ["blue", "green", "red", "orange", "purple"];
}

function getRandomColor() {
  if (colors.length === 0) {
    resetColor();
  }
  return colors.splice(Math.floor(Math.random() * colors.length), 1)[0];
}

function checkLines(userBoard) {
  var lines = [];
  var left_cross = [
    userBoard[0],
    userBoard[6],
    userBoard[12],
    userBoard[18],
    userBoard[24]
  ];
  var right_cross = [
    userBoard[4],
    userBoard[8],
    userBoard[12],
    userBoard[16],
    userBoard[20]
  ];

  var horizontal_line_one = [
    userBoard[0],
    userBoard[1],
    userBoard[2],
    userBoard[3],
    userBoard[4]
  ];
  var horizontal_line_two = [
    userBoard[5],
    userBoard[6],
    userBoard[7],
    userBoard[8],
    userBoard[9]
  ];
  var horizontal_line_three = [
    userBoard[10],
    userBoard[11],
    userBoard[12],
    userBoard[13],
    userBoard[14]
  ];
  var horizontal_line_four = [
    userBoard[15],
    userBoard[16],
    userBoard[17],
    userBoard[18],
    userBoard[19]
  ];
  var horizontal_line_five = [
    userBoard[20],
    userBoard[21],
    userBoard[22],
    userBoard[23],
    userBoard[24]
  ];

  var vertical_line_one = [
    userBoard[0],
    userBoard[5],
    userBoard[10],
    userBoard[15],
    userBoard[20]
  ];
  var vertical_line_two = [
    userBoard[1],
    userBoard[6],
    userBoard[11],
    userBoard[16],
    userBoard[21]
  ];
  var vertical_line_three = [
    userBoard[2],
    userBoard[7],
    userBoard[12],
    userBoard[17],
    userBoard[22]
  ];
  var vertical_line_four = [
    userBoard[3],
    userBoard[8],
    userBoard[13],
    userBoard[18],
    userBoard[23]
  ];
  var vertical_line_five = [
    userBoard[4],
    userBoard[9],
    userBoard[14],
    userBoard[19],
    userBoard[24]
  ];

  if (selectedConfirm(left_cross)) {
    lines.push("line left_cross");
  }
  if (selectedConfirm(right_cross)) {
    lines.push("line right_cross");
  }
  if (selectedConfirm(horizontal_line_one)) {
    lines.push("line horizontal horizontal_line_one");
  }
  if (selectedConfirm(horizontal_line_two)) {
    lines.push("line horizontal horizontal_line_two");
  }
  if (selectedConfirm(horizontal_line_three)) {
    lines.push("line horizontal horizontal_line_three");
  }
  if (selectedConfirm(horizontal_line_four)) {
    lines.push("line horizontal horizontal_line_four");
  }
  if (selectedConfirm(horizontal_line_five)) {
    lines.push("line horizontal horizontal_line_five");
  }
  if (selectedConfirm(vertical_line_one)) {
    lines.push("line vertical vertical_line_one");
  }
  if (selectedConfirm(vertical_line_two)) {
    lines.push("line vertical vertical_line_two");
  }
  if (selectedConfirm(vertical_line_three)) {
    lines.push("line vertical vertical_line_three");
  }
  if (selectedConfirm(vertical_line_four)) {
    lines.push("line vertical vertical_line_four");
  }
  if (selectedConfirm(vertical_line_five)) {
    lines.push("line vertical vertical_line_five");
  }

  return lines;
}

function roomCount(rooms) {
  let count = 0;
  for (room in rooms) {
    if (room.indexOf('room') === 0) {
      count++;
    }
  }

  return count;
}

module.exports = {
  getRandomBoard: getRandomBoard,
  setSelectNumbers: setSelectNumbers,
  checkLines: checkLines,
  getRandomColor: getRandomColor,
  roomCount: roomCount
};
