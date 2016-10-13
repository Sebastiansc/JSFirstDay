let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */





function _makeGrid () {
  let grid = []
  while(grid.length < 8) {
    grid.push(new Array(8).fill(null))
  }
  grid[3][4] = new Piece("black");
  grid[4][3] = new Piece("black");
  grid[3][3] = new Piece("white");
  grid[4][4] = new Piece("white");
  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let x = pos[0]
  let y = pos[1]
  if (!this.isValidPos(pos)) {
    throw new ReferenceError;
  }
  return this.grid[x][y];
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return !!this.validMoves(color).length
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let piece = this.getPiece(pos)
  return piece && piece.color === color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return !!this.getPiece(pos)
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !this.hasMove("black") && !this.hasMove('white');
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let x = pos[0]
  let y = pos[1]
  return Math.min(x,y) >= 0 && Math.max(x,y) < this.grid.length;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
  let next_pos = [pos[0] + dir[0], pos[1] + dir[1]];
  if (!board.isValidPos(next_pos)) return null;
  if (!board.isOccupied(next_pos)) return null;
  if (board.isMine(next_pos, color)) {
    if (piecesToFlip.length) {
      return piecesToFlip;
    } else {
      return null;
    }
  }
  let current_piece = board.getPiece(next_pos);
  piecesToFlip.push(current_piece);
  return _positionsToFlip(board, next_pos, color, dir, piecesToFlip);
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.validMove(pos, color)) throw new ReferenceError;
  let x = pos[0]
  let y = pos[1]
  this.grid[x][y] = new Piece(color)
  let board = this
  Board.DIRS.forEach(function(dir){
    const captures = _positionsToFlip(board, pos, color, dir, [])
    if (captures){
      captures.forEach(function(cap){
        cap.flip();
      })
    }
  })
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  // console.log(this.grid)
  if (this.isOccupied(pos)) return false;
  let board = this
  captures = []
  Board.DIRS.forEach( function(dir) {
    vector = _positionsToFlip(board, pos, color, dir, [])
    captures.push(vector)
  })
  captures = captures.filter(el => el)
  return captures.length
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let valid_moves = []
  for (let idx = 0; idx < this.grid.length; idx++) {
    for (let idy = 0; idy < this.grid.length; idy++) {
      if (this.validMove([idx,idy], color)) {
        valid_moves.push([idx, idy]);
      }
    }
  }
  return valid_moves;
};

module.exports = Board;
