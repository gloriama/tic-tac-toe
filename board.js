// Board class
// Provides interface to set and clear pieces
// Allows checking of win or about-to-lose state

// Interface:
// set(r, c, 'x')
// get(r, c)
// clear()
// getState()
  // returns object with
  // state: 'none', 'check', 'checkmate', 'end', 'invalid'
  // player: 'x' (or 'o' or undefined)
// print()

var utils = require('./utils');
var constants = require('./constants');
var BOARD_DIMENSION = constants.BOARD_DIMENSION;
var O_MARK = constants.O_MARK;
var X_MARK = constants.X_MARK;
var EMPTY_MARK = constants.EMPTY_MARK;

var Board = function() {
  this._positions = [];
  for (var r = 0; r < BOARD_DIMENSION; r++) {
    var newRow = [];
    for (var c = 0; c < BOARD_DIMENSION; c++) {
      newRow.push(EMPTY_MARK);
    }
    this._positions.push(newRow);
  }
};

Board.prototype.set = function(r, c, mark) {
  if (this._positions[r][c] !== EMPTY_MARK) {
    return false;
  } else {
    this._positions[r][c] = mark;
    return true;
  }
};

Board.prototype.get = function(r, c) {
  return this._positions[r][c];
};

Board.prototype.clear = function() {
  for (var r = 0; r < BOARD_DIMENSION; r++) {
    for (var c = 0; c < BOARD_DIMENSION; c++) {
      this._positions[r][c] = EMPTY_MARK;
    }
  }
};

Board.prototype.print = function() {
  var singleLine = utils.repeatedChar('-', BOARD_DIMENSION * 4 + 1);
  var doubleLine = utils.repeatedChar('=', BOARD_DIMENSION * 4 + 1);

  var result = doubleLine + '\n';
  result += this._positions.map(function(row) {
    return '| ' + row.join(' | ') + ' |' + '\n';
  }).join(singleLine + '\n');
  result += doubleLine;

  console.log(result);
};

// TODO
Board.prototype.getState = function() {
  // check rows, cols, and diagonals for:
    // win state
    // check state
  // then perform logic for determining overall state:
    // win
    // checkmate
    // check
    // none
    // invalid

  var win = EMPTY_MARK;
  var checkForO = [];
  var checkForX = [];
  var state = '';
  // this._forEachPosition(function(mark) {
  //   if (mark !== EMPTY_MARK && mark !== )
  // });
  // this._forEachLine(function(marks, positions) {
  //   // check win state
  //   if (marks[O_MARK] === BOARD_DIMENSION ||
  //       marks[X_MARK] === BOARD_DIMENSION) {
  //     if (win === EMPTY_MARK) {
  //       win = 
  //     }
  //   }
  // });
};

// if no one has won, return undefined
Board.prototype.getWinner = function() {
  var isAll = function(mark) {
    return function(line) {
      for (var i = 0; i < line.length; i++) {
        if (line[i] !== mark) {
          return false;
        }
      }
      return true;
    };
  };

  if (this.checkFor(isAll(X_MARK))) {
    return X_MARK;
  } else if (this.checkFor(isAll(O_MARK))) {
    return O_MARK;
  } else {
    return undefined;
  }
};

Board.prototype.isDrawn = function() {
  var isWinnable = function(line) {
    return (
      line.indexOf(X_MARK) === -1 ||
      line.indexOf(O_MARK) === -1
    );
  };

  return this.getWinner() === undefined &&
    !this.checkFor(isWinnable);
};

Board.prototype.checkFor = function(test) {
  // test is a function that takes a line of items in the board
  // (a row, column, or diagonal)
  // checkFor returns whether or not ANY line is true
  
  var line;
  var r;
  var c;

  // check rows
  for (r = 0; r < BOARD_DIMENSION; r++) {
    line = this._positions[r];
    if (test(line)) {
      return true;
    } 
  }

  // check columns
  for (c = 0; c < BOARD_DIMENSION; c++) {
    line = [];
    for (r = 0; r < BOARD_DIMENSION; r++) {
      line.push(this.get(r, c));
    }
    if (test(line)) {
      return true;
    }
  }

  // check major diagonal
  line = [];
  for (r = 0; r < BOARD_DIMENSION; r++) {
    c = r;
    line.push(this.get(r, c));
  }
  if (test(line)) {
    return true;
  }

  // check minor diagonal
  line = [];
  for (r = 0; r < BOARD_DIMENSION; r++) {
    c = BOARD_DIMENSION - 1 - r;
    line.push(this.get(r, c));
  }
  if (test(line)) {
    return true;
  }

  return false;
};

module.exports = Board;