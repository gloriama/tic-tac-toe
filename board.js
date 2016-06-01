// Board class
// Provides interface to set and clear pieces
// Allows checking of win or about-to-lose state

// Interface:
// set(r, c, 'x')
// get(r, c)
// clear()
// getState()
  // returns object with
  // state: 'none', 'check', 'checkmate', 'end'
  // player: 'x' (or 'o' or undefined)
// 

var BOARD_DIMENSION = 3;
var O_MARK = 0;
var X_MARK = 1;
var EMPTY_MARK = 2;

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
  var oldValue = this._positions[r][c];
  this._positions[r][c] = mark;
  return oldValue;
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

Board.prototype.getState = function() {

};