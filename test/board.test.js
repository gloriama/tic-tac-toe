var assert = require('chai').assert;
var Board = require('../board');

describe('Board class', function() {
  var board;

  beforeEach(function() {
    board = new Board();
  });

  it('has sideLength, xMark, oMark, and emptyMark', function() {
    assert.isDefined(board.sideLength);
    assert.isDefined(board.xMark);
    assert.isDefined(board.oMark);
    assert.isDefined(board.emptyMark);
  });

  it('saves value to board when setting empty position', function() {
    board.set(1, 1, board.xMark);
    assert.equal(board.get(1, 1), board.xMark);
  });

  it('returns true when setting empty position', function() {
    assert.isTrue(board.set(1, 1, board.xMark));
  });

  it('does not save value to board when setting used position', function() {
    board.set(1, 1, board.xMark);
    board.set(1, 1, board.oMark);
    assert.equal(board.get(1, 1), board.xMark);
  });

  it('returns false when setting used position', function() {
    board.set(1, 1, board.xMark);
    assert.isFalse(board.set(1, 1, board.xMark));
  });
});