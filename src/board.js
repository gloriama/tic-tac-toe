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
var DEFAULT_SIDELENGTH = 3;
var DEFAULT_O_MARK = 'o';
var DEFAULT_X_MARK = 'x';
var DEFAULT_EMPTY_MARK = ' ';

var Board = function(options) {
  options = options || {};
  this.sideLength = options.sideLength || DEFAULT_SIDELENGTH;
  this.oMark = options.oMark || DEFAULT_O_MARK;
  this.xMark = options.xMark || DEFAULT_X_MARK;
  this.emptyMark = options.emptyMark || DEFAULT_EMPTY_MARK;

  this._positions = [];
  for (var r = 0; r < this.sideLength; r++) {
    var newRow = [];
    for (var c = 0; c < this.sideLength; c++) {
      newRow.push(this.emptyMark);
    }
    this._positions.push(newRow);
  }
};

Board.prototype.set = function(r, c, mark) {
  if (this._positions[r][c] !== this.emptyMark) {
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
  for (var r = 0; r < this.sideLength; r++) {
    for (var c = 0; c < this.sideLength; c++) {
      this._positions[r][c] = this.emptyMark;
    }
  }
};

Board.prototype.print = function() {
  var singleLine = utils.repeatedChar('-', this.sideLength * 4 + 1);
  var doubleLine = utils.repeatedChar('=', this.sideLength * 4 + 1);

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

  // var win = this.emptyMark;
  // var checkForO = [];
  // var checkForX = [];
  // var state = '';

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

  if (this.checkFor(isAll(this.xMark))) {
    return this.xMark;
  } else if (this.checkFor(isAll(this.oMark))) {
    return this.oMark;
  } else {
    return undefined;
  }
};

Board.prototype.isDrawn = function() {
  var isWinnable = function(line) {
    return (
      line.indexOf(this.xMark) === -1 ||
      line.indexOf(this.oMark) === -1
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
  for (r = 0; r < this.sideLength; r++) {
    line = this._positions[r];
    if (test(line)) {
      return true;
    } 
  }

  // check columns
  for (c = 0; c < this.sideLength; c++) {
    line = [];
    for (r = 0; r < this.sideLength; r++) {
      line.push(this.get(r, c));
    }
    if (test(line)) {
      return true;
    }
  }

  // check major diagonal
  line = [];
  for (r = 0; r < this.sideLength; r++) {
    c = r;
    line.push(this.get(r, c));
  }
  if (test(line)) {
    return true;
  }

  // check minor diagonal
  line = [];
  for (r = 0; r < this.sideLength; r++) {
    c = this.sideLength - 1 - r;
    line.push(this.get(r, c));
  }
  if (test(line)) {
    return true;
  }

  return false;
};

module.exports = Board;