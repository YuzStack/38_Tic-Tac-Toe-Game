'use strict';

// Build (define) the game board
const gameBoard = {
  board: new Array(9).fill(null),
};

// Factory function to create the players objects
const createPlayer = function (name, marker) {
  return { name, marker };
};

const playerOne = createPlayer('Yusuf', 'X');
const playerTwo = createPlayer('Adam', 'O');

// The Controller Object that controls the game flow
const gameController = (function () {
  const players = [playerOne, playerTwo];
  let curPlayerIdx = 0;
  let curPlayer = players[curPlayerIdx];

  const switchActivePlayer = function () {
    curPlayerIdx = curPlayerIdx === 0 ? 1 : 0;
    curPlayer = players[curPlayerIdx];
  };

  const checkWin = function () {
    if (
      // Condition 1 (all first row)
      (gameBoard.board[0] === curPlayer.marker &&
        gameBoard.board[1] === curPlayer.marker &&
        gameBoard.board[2] === curPlayer.marker) ||
      // Condition 2 (all second row)
      (gameBoard.board[3] === curPlayer.marker &&
        gameBoard.board[4] === curPlayer.marker &&
        gameBoard.board[5] === curPlayer.marker) ||
      // Condition 3 (all third row)
      (gameBoard.board[6] === curPlayer.marker &&
        gameBoard.board[7] === curPlayer.marker &&
        gameBoard.board[8] === curPlayer.marker) ||
      // Condition 4 (all first column)
      (gameBoard.board[0] === curPlayer.marker &&
        gameBoard.board[3] === curPlayer.marker &&
        gameBoard.board[6] === curPlayer.marker) ||
      // Condition 5 (all second column)
      (gameBoard.board[1] === curPlayer.marker &&
        gameBoard.board[4] === curPlayer.marker &&
        gameBoard.board[7] === curPlayer.marker) ||
      // Condition 6 (all third column)
      (gameBoard.board[2] === curPlayer.marker &&
        gameBoard.board[5] === curPlayer.marker &&
        gameBoard.board[8] === curPlayer.marker) ||
      // Condition 7 (Diagonal 1)
      (gameBoard.board[0] === curPlayer.marker &&
        gameBoard.board[4] === curPlayer.marker &&
        gameBoard.board[8] === curPlayer.marker) ||
      // Condition 8 (Diagonal 2)
      (gameBoard.board[2] === curPlayer.marker &&
        gameBoard.board[4] === curPlayer.marker &&
        gameBoard.board[6] === curPlayer.marker)
    )
      return true;

    return false;
  };

  const checkeContinuity = function () {
    if (gameBoard.board.some(slot => slot === null)) return true;
    return false;
  };

  const restartGame = () => (gameBoard.board = new Array(9).fill(null));

  const playRound = function (slotIndex) {
    // Check if the slot is already filled, and if not, fill it
    if (gameBoard.board[slotIndex]) return alert('Slot taken!');
    gameBoard.board[slotIndex] = curPlayer.marker;

    // Check if there's a win
    if (checkWin()) return console.log(`${curPlayer.name} WINS! 🏆🏆🙌`);

    // Check if there's still any unfilled slot
    if (!checkeContinuity()) {
      // Restart game (clear all slots entries)
      restartGame();
      return console.log("It's a TIE! 🤝🤝");
    }

    // Switch active player
    switchActivePlayer();
  };

  return { playRound };
})();

// gameController.playRound(0);
// gameController.playRound(3);
// gameController.playRound(1);
// gameController.playRound(2);
// gameController.playRound(4);
// gameController.playRound(8);
// gameController.playRound(5);
// gameController.playRound(7);
// gameController.playRound(6);
// console.log(gameBoard.board);
