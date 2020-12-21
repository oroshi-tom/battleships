// Get Dom elements
//#################
const grid = document.querySelector(".grid");
const cells = [];
const topBar = document.querySelector(".top-bar");
const sideBar = document.querySelector(".side-bar");
// const destroyerBtn = document.querySelector(".destroyer-btn");
// const cruiserBtn = document.querySelector(".cruiser-btn");

// const startBtn = document.querySelector(".start-btn");
const readyBtn = document.querySelector(".ready-btn");
const turnBtn = document.querySelector(".turn-btn");
const messageDisplay = document.querySelector(".message");
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

// Define Classes
let turn = true;
let message;

//// Player Class
class Player {
  constructor(id) {
    this.id = id;
  }
  ships = [];
  shots = [];
  hits = [];
  // Place ships on board
  placeShips(player) {
    message =
      "<h2>" +
      "Player " +
      this.id +
      "</h2>" +
      "<p>" +
      "Place your ships by clicking on the grid, click 'Ready' when finished" +
      "</p>";
    messageDisplay.innerHTML = message;
    let cellId;
    // Listen to grid for clicks

    grid.addEventListener("click", (e) => {
      // Color the background
      e.target.style.background = "gray";
      // Get the selected cell's id's
      cellId = parseInt(e.target.dataset.id);
      // Store id's into instance's ships array
      this.ships.push(cellId);
    });
    // Increment ready count
    readyCount++;
  }

  // Place shots on board
  takeShot(player) {
    message =
      "<h2>" + "Player " + this.id + "</h2>" + "<p>" + "Your Turn" + "</p>";
    messageDisplay.innerHTML = message;
    let cellId;
    grid.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        e.target.style.background = "red";
        cellId = parseInt(e.target.dataset.id);
        this.shots.push(cellId);
        // Check if shot matches other player ship location
        // If player 1
        if (turn) {
          if (game.player_2.ships.includes(cellId)) {
            this.hits.push(cellId);
          }
          // If player 2
        } else {
          if (game.player_1.ships.includes(cellId)) {
            this.hits.push(cellId);
          }
        }

        console.log(`player 1 hits: ${game.player_1.hits}`);
        console.log(`player 2 hits: ${game.player_2.hits}`);
      },
      { once: true }
    );
  }
  turn = !turn;
}

class Game {
  constructor(player_1, player_2) {
    this.player_1 = player_1;
    this.player_2 = player_2;
  }
}

// START GAME
//#################

// Initialize game + players
var player_1 = new Player(1);
var player_2 = new Player(2);
var game = new Game(player_1, player_2);
let readyCount = 0;
let ready = false;
let win = false;

game.player_1.placeShips();

// Place player 1 ships on board
readyBtn.addEventListener("click", playerReady);
function playerReady() {
  // If player one is ready
  if (readyCount == 1) {
    // Hide player 1 ships
    game.player_1.ships.forEach((ship) => {
      cells[ship].style.background = "";
    });

    // Player 2's turn
    game.player_2.placeShips();

    //if both players are ready
  } else if (readyCount == 2) {
    // Hide player 2 ships
    game.player_2.ships.forEach((ship) => {
      cells[ship].style.background = "";
    });
    // stop listening to ready button
    readyBtn.removeEventListener("click", playerReady);
    readyBtn.classList.toggle("hidden");
    while (true) {
      startTurns();
      if (win) {
        break;
      }
    }
  }
  // Console info for debugging
  console.log(`player 1 ships: ${game.player_1.ships}`);
  console.log(`player 2 ships: ${game.player_2.ships}`);
  console.log(`ready count: ${readyCount}`);
}

function startTurns() {
  // Check for winner
  if (
    game.player_1.ships.length != 0 &&
    game.player_1.ships.length == game.player_1.hits.length
  ) {
    win = true;
  }
  game.player_1.takeShot();

  if (turn) {
    game.player_1.takeShot();
  } else {
    game.player_2.takeShot();
  }
  turn = !turn;
}
