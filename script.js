'use strict';

const slotBoxes = document.querySelector('.slots-boxes');
const playerTurnEl = document.querySelector('.players-turn');
const restartBtn = document.querySelector('.restart-btn');

const gamePlayEl = document.querySelector('.game-display');
const dialogEl = document.querySelector('.dialog');
const dialogFormEl = document.querySelector('.dialog-form');

const playerOneInpEl = document.querySelector('.dialog #player-1');
const playerTwoInpEl = document.querySelector('.dialog #player-2');

let playerOneName, playerTwoName;

// Setting Initial UI
dialogEl.showModal();
dialogFormEl.addEventListener('submit', function () {
  gamePlayEl.classList.remove('opacity-0', '-translate-y-[10%]');
  playerOneName = playerOneInpEl.value || 'Player1';
  playerTwoName = playerTwoInpEl.value || 'Player2';
  console.log(playerOneName, playerTwoName);

  // Build (define) the game board
  const gameBoard = {
    board: new Array(9).fill(null),
  };

  // Factory function to create the players objects
  const createPlayer = function (name, marker) {
    return { name, marker };
  };

  const playerOne = createPlayer(playerOneName, 'X');
  const playerTwo = createPlayer(playerTwoName, 'O');

  playerTurnEl.textContent = `It's ${playerOne.name}'s turn`;

  // The Controller Object that controls the game flow
  const gameController = (function () {
    const players = [playerOne, playerTwo];
    let curPlayerIdx = 0;
    let curPlayer = players[curPlayerIdx];

    const switchActivePlayer = function () {
      curPlayerIdx = curPlayerIdx === 0 ? 1 : 0;
      curPlayer = players[curPlayerIdx];
      playerTurnEl.textContent = `It's ${curPlayer.name}'s turn`;
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

    const restartGame = function () {
      gameBoard.board = new Array(9).fill(null);
      curPlayerIdx = 0;
      curPlayer = players[curPlayerIdx];
    };

    const playRound = function (slotIndex) {
      // Check if the slot is already filled, and if not, fill it
      if (gameBoard.board[slotIndex]) return alert('Slot taken!');
      gameBoard.board[slotIndex] = curPlayer.marker;

      // Check if there's a win
      if (checkWin())
        return (playerTurnEl.textContent = `${curPlayer.name} WINS! 🏆🏆`);

      // Check if there's still any unfilled slot
      if (!checkeContinuity())
        return (playerTurnEl.textContent = "It's a TIE! 🤝🤝");

      // Switch active player
      switchActivePlayer();
    };

    return { playRound, restartGame };
  })();

  const screenController = (function () {
    const renderBoardState = function () {
      gameBoard.board.forEach((slot, idx) => {
        document
          .querySelector(`div[data-slot="${idx}"]`)
          .querySelector('.text-content').textContent = slot;
      });
    };

    const addMark = function (e) {
      const clicked = e.target.closest('.slot-box');
      if (!clicked) return;

      // Get slot index and try to fill it
      const slot = +clicked.dataset.slot;
      gameController.playRound(slot);

      // Render the game board state
      renderBoardState();
    };

    return { renderBoardState, addMark };
  })();

  slotBoxes.addEventListener('click', screenController.addMark);

  // Restart game logic
  restartBtn.addEventListener('click', function () {
    gameController.restartGame();
    playerTurnEl.textContent = `It's ${playerOne.name}'s turn`;

    screenController.renderBoardState();
  });
});
