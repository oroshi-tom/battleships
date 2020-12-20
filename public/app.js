// Get Dom elements
//#################
const grid = document.querySelector(".grid");
const cells = [];
const topBar = document.querySelector(".top-bar");
const sideBar = document.querySelector(".side-bar");
const destroyerBtn = document.querySelector(".destroyer-btn");
const cruiserBtn = document.querySelector(".cruiser-btn");
const startBtn = document.querySelector(".start-btn");
const endBtn = document.querySelector(".end-btn");
const currtentPlayerDisplay = document.querySelector(".player-Id");

//--------------------------------------------------------------------//

// Declare Globals
//################
const topBarLabels = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const height = 10;
const width = 10;

//// Current Player - set to one
var currentPlayer = 1;

// Placeholders for ship co-ordinates
const playerOneShips = [];
const playerTwoShips = [];
//--------------------------------------------------------------------//

// Create Board
//#############
function createBoard() {
  // Create top-bar
  for (let i = 0; i < topBarLabels.length; i++) {
    // Create elements to add to top-bar
    var column = document.createElement("div");
    column.textContent = topBarLabels[i];
    topBar.appendChild(column);
  }
  // Create side-bar
  for (let i = 0; i < 10; i++) {
    var row = document.createElement("div");
    row.textContent = i;
    sideBar.appendChild(row);
  }
  // create Grid
  for (let i = 0; i < height * width; i++) {
    var cell = document.createElement("div");
    // Give each cell a unique id
    cell.setAttribute("data-id", i);
    cell.className = "cell";
    grid.appendChild(cell);
    cells.push(cell);
  }
}

createBoard();
//--------------------------------------------------------------------//
var turn = true;

class Player {
  constructor(id) {
    this.id = id;
  }
  ships = [];
  shots = [];
  placeShips(player) {
    let cellId;
    grid.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.style.background = "gray";
      cellId = parseInt(e.target.dataset.id);
      this.ships.push(cellId);
      console.log(`player: ${player.id} cell: ${cellId} ships: ${this.ships}`);
    });
  }
  tskeShot(player) {
    let cellId;
    grid.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.style.background = "red";
      this.shots.push(cellId);
    });
  }
}

class Game {
  constructor(player_1, player_2) {
    this.player_1 = player_1;
    this.player_2 = player_2;
  }
}

var player_1 = new Player(1);
var player_2 = new Player(2);
var game = new Game(player_1, player_2);

if (turn) {
  game.player_1.placeShips(player_1);
} else {
  game.player_2.placeShips(player_2);
}
turn = !turn;
