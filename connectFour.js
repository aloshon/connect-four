/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
class Game {

  constructor(p1, p2, row = 7, col = 6){
    this.players = [p1, p2];
    this.col = col;
    this.row = row;
    this.makeBoard();
    this.makeHtmlBoard();
    this.currPlayer = p1;
  };

  
 /** makeBoard:
 *   board = array of rows, each row is an array with length of col
 */
  makeBoard() {
    this.board = [];
    for (let y = 0; y < this.col; y++) {
      this.board.push(Array.from({ length: this.row }));
    }
  };

  /** makeHtmlBoard: make HTML table with col height and row length.
   * Set each cell's proper x-y coords and click event listeners
   */
  makeHtmlBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
  
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    this.handleGameClick = this.handleClick.bind(this);
    // on click, put piece in proper place in col
    top.addEventListener("click", this.handleGameClick);
  
    for (let x = 0; x < this.row; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    board.append(top);
  
    // make main part of board
    for (let y = 0; y < this.col; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < this.row; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
  
      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return y is empty or null if filled/has piece */
  findSpotForCol(x) {
    for (let y = this.col - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  };

  /** placeInTable: update DOM to place piece into HTML table of board */
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece', 'fall');
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.border = "1px black solid";
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  };

  /** endGame: announce game end */
  endGame(msg) {
    const stop = document.getElementById("column-top")
    stop.removeEventListener("click", this.handleGameClick);
    // wait for piece to load on DOM then notify end game
    setTimeout(() => {
      alert(msg);
    }, 0)
  };

  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    // get x from ID of clicked cell (convert into integer first)
    const x = +evt.target.id;
  
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
    
    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Whoever is ${this.currPlayer.piece} won!`);
    }
    
    // check for tie and give disappointed response if no one won
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
      
    // switch players if game has not ended
    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
  };

  /** checkForWin: check board cell-by-cell for "does a win start here?" */
  checkForWin() {
    const _win = cells => {
      // Given one coord, check all possible win conditions:
      //  Check if there is 4 in a row starting from cell that was filled
      //  vertical, horizontal, diagonal right, and diagonal left
      //  - returns true if all are legal coordinates & all match currPlayer color
  
      let winner = cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.col &&
          x >= 0 &&
          x < this.row &&
          this.board[y][x] === this.currPlayer
      );

      return winner;

    }
    
  
    for (let y = 0; y < this.col; y++) {

      for (let x = 0; x < this.row; x++) {
        // get "check list" of 4 cells (starting [y,x]) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
    
        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }

    }

  }
}
// color pieces for users to choose
const colors = [
  {
    text: 'Red',
    value: 'red'
  },
  {
    text: 'Blue',
    value: 'blue'
  },
  {
    text: 'Green',
    value: 'green'
  },
  {
    text: 'Yellow',
    value: 'yellow'
  },
  {
    text: 'Gold',
    value: 'gold'
  },
  {
    text: 'Silver',
    value: 'silver'
  },
  {
    text: 'Crystal',
    value: '#A7D8DE'
  },
  {
    text: 'Ruby',
    value: '#EE115F'
  },
  {
    text: 'Sapphire',
    value: '#0F52BA'
  },
  {
    text: 'Emerald',
    value: '#046307'
  },
  {
    text: 'Diamond',
    value: '#B9F2FF'
  },
  {
    text: 'Pearl',
    value: '#FDEEF4'
  },
  {
    text: 'Platinum',
    value: '#E5E4E2'
  },
  {
    text: 'Black',
    value: '#000000'
  },
  {
    text: 'White',
    value: '#F7F7F7'
  },
  {
    text: 'Purple',
    value: '#FF00FF'
  },
  {
    text: 'Pink',
    value: '#FFBBBB'
  },
];


const colorList1 = document.getElementById('p1-color').options;
const colorList2 = document.getElementById('p2-color').options;

colors.forEach(color => {
  // new Option is a new class that adds an option to the select html tag list
  colorList1.add(
    new Option(color.text, color.value)
  )
  
  colorList2.add(
    new Option(color.text, color.value)
  )
  
});

// piece is the color name, color is the color css value/hex decimal
class Player {
  constructor(color, piece){
    this.color = color;
    this.piece = piece
  }

}

document.getElementById('button').addEventListener('click', () => {
  const p1 = document.getElementById('p1-color');
  const p2 = document.getElementById('p2-color');
  const p1Piece = p1.options[p1.selectedIndex].text;
  const p2Piece = p2.options[p2.selectedIndex].text;

  if(p1Piece === p2Piece) return alert("Y'all can't use the same color! ???");

  new Game(new Player(p1.value, p1Piece), new Player(p2.value, p2Piece));
});

