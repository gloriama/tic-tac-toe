var prompt = require('prompt');
var utils = require('./utils');
var Board = require('./board');
var constants = require('./constants');
var BOARD_DIMENSION = constants.BOARD_DIMENSION;
var O_MARK = constants.O_MARK;
var X_MARK = constants.X_MARK;
var EMPTY_MARK = constants.EMPTY_MARK;

var YES_RESPONSES = { y: true, yes: true };
var NO_RESPONSES = { n: true, no: true };

var startGame = function() {
  var board = new Board();

  console.log(utils.repeatedChar('\n', 100));
  board.print();
  console.log('Welcome! You are', X_MARK + ', and the computer is', O_MARK + '.');
  
  runTurns(board, function(outcome) {
    if (outcome === X_MARK) {
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

var runTurns = function(board, callback) {
  console.log('Enter a row index first, and then a column index.');
  prompt.get(['r', 'c'], function(err, result) {
    if (err) {
      return err;
    }

    console.log(utils.repeatedChar('\n', 100));

    if (!isValidIndex(result.r) || !isValidIndex(result.c)) {
      console.log('Please enter integers from 0 to', BOARD_DIMENSION - 1 + '.');
      runTurns(board, callback);
    } else {
      var r = parseInt(result.r);
      var c = parseInt(result.c);
      if (!board.set(r, c, constants.X_MARK)) {
        console.log('That spot is already taken.');
      } else if (board.getWinner() === undefined) {
        runAiTurn(board);
      }
      board.print();
      if (board.getWinner() !== undefined) {
        callback(board.getWinner());
      } else {
        runTurns(board, callback);
      }
    }
  })
};

var isValidIndex = function(input) {
  return /^\d+$/.test(input) && // contains only digits
    input < BOARD_DIMENSION;
};

var runAiTurn = function(board) {
  while (!board.set(
    Math.floor(Math.random() * BOARD_DIMENSION),
    Math.floor(Math.random() * BOARD_DIMENSION),
    O_MARK
  )) {}
}

prompt.start();
startGame();