var prompt = require('prompt');
var utils = require('./utils');
var Board = require('./board');

var YES_RESPONSES = { y: true, yes: true };
var NO_RESPONSES = { n: true, no: true };

var startGame = function() {
  var board = new Board();

  // print initial board and instructions
  console.log(utils.repeatedChar('\n', 100));
  board.print();
  console.log('Welcome! You are', board.xMark + ', and the computer is', board.oMark + '.');
  
  // run through all turns until game ends
  // then print closing message and prompt to play again
  runTurns(board, function(outcome) {
    if (outcome === 'drew') {
      console.log('Draw! No one can win.');
    } else if (outcome === 'won') {
      console.log('Congratulations! You won.');
    } else {
      console.log('You lost.');
    }
    console.log('Play again? (Y/N)');
    prompt.get(['playAgain'], function(err, result) {
      if (err) {
        return err;
      }

      if (result.playAgain.toLowerCase() in YES_RESPONSES) {
        startGame();
      }
    })
  });
};

var runTurns = function(board, endCallback) {
  console.log('Enter a row index first, and then a column index.');
  prompt.get(['r', 'c'], function(err, result) {
    if (err) {
      return err;
    }

    // print empty lines to "clear" window
    console.log(utils.repeatedChar('\n', 100));

    // validate r, c input
    if (!isValidIndex(result.r, board) || !isValidIndex(result.c, board)) {
      console.log('Please enter integers from 0 to', board.sideLength - 1 + '.');
      runTurns(board, endCallback);
      return;
    }

    // update board, collecting message to print (if any)
    var r = parseInt(result.r);
    var c = parseInt(result.c);
    var message = '';
    if (!board.set(r, c, board.xMark)) {
      message = 'That spot is already taken.';
    } else if (
        board.getWinner() === undefined &&
        !board.isDrawn()
      ) {
      runAiTurn(board);
    }

    // print board (and message, if any)
    board.print();
    if (message) {
      console.log(message);
    }

    // run the next turn, or end game
    var winner = board.getWinner();
    if (winner === board.xMark) {
      endCallback('won');
    } else if (winner === board.oMark) {
      endCallback('lost');
    } else if (board.isDrawn()) {
      endCallback('drew');
    } else {
      runTurns(board, endCallback);
    }
  })
};

var isValidIndex = function(input, board) {
  return /^\d+$/.test(input) && // contains only digits
    input < board.sideLength;
};

var runAiTurn = function(board) {
  while (!board.set(
    Math.floor(Math.random() * board.sideLength),
    Math.floor(Math.random() * board.sideLength),
    board.oMark
  )) {}
}

prompt.start();
startGame();