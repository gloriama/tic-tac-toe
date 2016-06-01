var prompt = require('prompt');
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
  runTurns(board, function(outcome) {
    console.log(outcome);
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
  prompt.get(['r', 'c'], function(err, result) {
    if (err) {
      return err;
    }

    if (!isValidIndex(result.r) || !isValidIndex(result.c)) {
      console.log('Please enter integers from 0 to', BOARD_DIMENSION - 1);
      runTurns(board, callback);
    } else {
      var r = parseInt(result.r);
      var c = parseInt(result.c);
      board.set(r, c, constants.X_MARK);
      board.print();
      if (board.hasWinner()) {
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

prompt.start();
startGame();