//####################################################################//
// Get DOM Elements
//####################################################################//
const grid = document.querySelector(".grid");
const cells = [];
const topBar = document.querySelector(".top-bar");
const sideBar = document.querySelector(".side-bar");
const readyBtn = document.querySelector(".ready-btn");
const turnBtn = document.querySelector(".turn-btn");
const messageDisplay = document.querySelector(".message");
const currtentPlayerDisplay = document.querySelector(".player-Id");

//####################################################################//
// Declare Globals
//####################################################################//
const topBarLabels = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const height = 10;
const width = 10;

//####################################################################//
// Create Board
//####################################################################//
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

  //create Grid
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

//####################################################################//
// Classes
//####################################################################//
class Player {
  constructor(id) {
    this.id = id;
  }
  // Each player has ships, shots taken, and hits on thier own ship
  ships = [];
  shots = [];
  hits = [];

  // PlaceShips Method
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
    let currentCellId;
    // Listen for clicks on grid, only run once
    grid.addEventListener(
      "click",
      (e) => {
        // Get the id of the cell
        currentCellId = parseInt(e.target.dataset.id);

        // Color the cell
        cells[currentCellId].style.background = "gray";

        // Define next valid cells, based on first cell
        let validCells = [
          // Cell directly above
          currentCellId - 10,
          // Cell directly below
          currentCellId + 10,
          // Cell after
          currentCellId + 1,
          // Cell before
          currentCellId - 1,
        ];

        // highlight valid cells if they are on grid
        for (let cell of validCells) {
          if (cell > 0) {
            cells[cell].style.background = "green";
            cells[cell].style.opacity = 0.5;
          }
        }

        // Listen for second clicks on grid
        grid.addEventListener(
          "click",
          (e) => {
            // Remove valid cell highlighting
            for (let cell of validCells) {
              if (cell > 0) {
                if ((cells[cell].style.background = "green")) {
                  cells[cell].style.background = "";
                  cells[cell].style.opacity = 1;
                }
              }
            }
            // get id of second cell
            let nextCellId = parseInt(e.target.dataset.id);

            // Check if cell is included in validCells
            let validCell = validCells.includes(nextCellId);

            // If second cell is valid
            if (validCell) {
              // Color the cell gray
              cells[nextCellId].style.background = "gray";

              // Get direction, and fill in the rest of the ship
              switch (nextCellId) {
                // Cell directly above
                case currentCellId - 10:
                  // color the block @ current - 20
                  cells[currentCellId - 20].style.background = "gray";
                  break;
                // color the block @ current + 20
                case currentCellId + 10:
                  cells[currentCellId + 20].style.background = "gray";
                  break;
                // color the block @ current + 20
                case currentCellId + 1:
                  cells[currentCellId + 2].style.background = "gray";
                  break;
                // color the block @ current - 2
                case currentCellId - 1:
                  cells[currentCellId - 2].style.background = "gray";
                  break;
              }
              cells.forEach((cell) => {
                if (cell.style.background == "gray") {
                  this.ships.push(cell.dataset.id);
                }
              });
              console.log(`player 1 ships: ${player_1.ships}`);
              console.log(`player 2 ships: ${player_2.ships}`);
            }
          },
          { once: true }
        );
      },
      { once: true }
    );
  }
  // TakeShots Method
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
        console.log(`Player ${this.id} fired on cell: ${cellId}`);
        // Check if shot matches other player ship location
        // If player 1
        if (this.id == 1) {
          if (player_2.ships.includes(cellId)) {
            this.hits.push(cellId);
            alert("hit!");
          } else {
            alert("miss");
          }
          // If player 2
        } else {
          if (player_1.ships.includes(cellId)) {
            this.hits.push(cellId);
            alert("hit!");
          } else {
            alert("miss");
          }
        }
      },
      { once: true }
    );
    console.log(`player 1 ships left: ${player_1.ships.length}`);
    console.log(`player 2 ships left: ${player_2.ships.length}`);
    console.log(`player 1 ships hit: ${player_1.hits.length}`);
    console.log(`player 2 ships hit: ${player_2.hits.length}`);
  }
}

// Game class
class Game {
  constructor(player_1, player_2) {
    this.player_1 = player_1;
    this.player_2 = player_2;
  }
}

//####################################################################//
// Instantiate players and game
//####################################################################//
var player_1 = new Player(1);
var player_2 = new Player(2);
var game = new Game(player_1, player_2);

//####################################################################//
// Start Game
//####################################################################//
let readyCount = 0;
let message;
let turn = true;
let gameOver;

while (readyCount < 2) {
  //// Place ships first
  game.player_1.placeShips();

  // Increment ready count
  readyCount++;

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
  }
}

// Start game turns
function startTurns() {
  // Check for winner
  while (true) {
    if (turn) {
      game.player_1.takeShot();
    } else {
      game.player_2.takeShot();
      break;
    }
    turn = !turn;
  }
}

startTurns();
