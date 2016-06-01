var prompt = require('prompt');
var constants = require('./constants');
var Board = require('./board');

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

    board.set(result.r, result.c, constants.X_MARK);
    board.print();
    runTurns(board, callback);
  })
};

prompt.start();
startGame();