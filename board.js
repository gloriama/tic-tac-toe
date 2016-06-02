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
  var singleLine = repeatedChar('-', BOARD_DIMENSION * 4 + 1);
  var doubleLine = repeatedChar('=', BOARD_DIMENSION * 4 + 1);

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
  // check rows
  for (var r = 0; r < BOARD_DIMENSION; r++) {
    var candidate;
    for (var c = 0; c < BOARD_DIMENSION; c++) {
      if (this.get(r, c) === EMPTY_MARK ||
          candidate !== undefined &&
          this.get(r, c) !== candidate) {
        candidate = undefined;
        break;
      }
      candidate = this.get(r, c);
    }
    if (candidate !== undefined) {
      return candidate;
    }
  }

  // check columns
  for (var c = 0; c < BOARD_DIMENSION; c++) {
    var candidate;
    for (var r = 0; r < BOARD_DIMENSION; r++) {
      if (this.get(r, c) === EMPTY_MARK ||
          candidate !== undefined &&
          this.get(r, c) !== candidate) {
        candidate = undefined;
        break;
      }
      candidate = this.get(r, c);
    }
    if (candidate !== undefined) {
      return candidate;
    }
  }

  // check major diagonal
  var candidate;
  for (var r = 0; r < BOARD_DIMENSION; r++) {
    var c = r;
    if (this.get(r, c) === EMPTY_MARK ||
        candidate !== undefined && this.get(r, c) !== candidate) {
      candidate = undefined;
      break;
    }
    candidate = this.get(r, c);
  }
  if (candidate !== undefined) {
    return candidate;
  }

  // check minor diagonal
  candidate = undefined;
  for (var r = 0; r < BOARD_DIMENSION; r++) {
    var c = BOARD_DIMENSION - 1 - r;
    if (this.get(r, c) === EMPTY_MARK ||
        candidate !== undefined && this.get(r, c) !== candidate) {
      candidate = undefined;
      break;
    }
    candidate = this.get(r, c);
  }
  if (candidate !== undefined) {
    return candidate;
  }  
};

// helper function
var repeatedChar = function(char, numTimes) {
  var result = '';
  for (var i = 0; i < numTimes; i++) {
    result += char;
  }
  return result;
}

module.exports = Board;

var b = new Board();
b.print();