function getRandomNumbers() {
	var cells = [];
	var numbers = [
		1, 2, 3, 4, 5, 
		6, 7, 8, 9, 10,
		11, 12, 13, 14, 15,
		16, 17, 18, 19, 20,
		21, 22, 23, 24, 25
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
		if (userBoard[i].value == number) {
			board.push({
				id: userBoard[i].id,
				selected: true,
				value: userBoard[i].value
			});
		} else {
			board.push({
				id: userBoard[i].id,
				selected: userBoard[i].selected,
				value: userBoard[i].value
			});
		}
	}

	return board
}

module.exports = {
	getRandomNumbers: getRandomNumbers,
	setSelectNumbers: setSelectNumbers
}