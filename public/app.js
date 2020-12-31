// DOM elements
const topBars = [...document.querySelectorAll(".top-bar")];
const sideBars = [...document.querySelectorAll(".side-bar")];
const grids = [...document.querySelectorAll(".grid")];
const gameMessage = document.querySelector("#gameMessage");
const restartBtn = document.querySelector("#restartBtn");

class Player {
  constructor(id, board, grid, cells, message, readyBtn) {
    this.id = id;
    this.board = board;
    this.grid = grid;
    this.cells = cells;
    this.message = message;
    this.readyBtn = readyBtn;
  }
  ready = false;
  hits = [];
  ships = [];
  shots = [];
}

// Game constants
const height = 10;
const width = 10;
const topBarLabels = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const cells = [];

// Build Game Boards
function buildGameBoard() {
  // Populate top bar
  for (let a = 0; a < topBars.length; a++) {
    for (let i = 0; i < width + 1; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "label");
      cell.textContent = topBarLabels[i];
      topBars[a].appendChild(cell);
    }
  }
  // Populate side bar
  for (let a = 0; a < sideBars.length; a++) {
    for (let i = 1; i < height + 1; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "label");
      cell.textContent = i;
      sideBars[a].appendChild(cell);
    }
  }
  // Populate grid
  for (let a = 0; a < grids.length; a++) {
    for (let i = 0; i < width * height; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      cell.setAttribute("data-id", i);
      if (a == 0) {
        cell.setAttribute("data-pl", "1");
      } else {
        cell.setAttribute("data-pl", "2");
      }
      grids[a].appendChild(cell);
      cells.push(cell);
    }
  }
}

// Build the Game Board
buildGameBoard();

// Player-specific elements
const pl1Board = document.querySelector('.board[data-pl="1"]');
const pl2Board = document.querySelector('.board[data-pl="2"]');
const pl1Grid = document.querySelector('.grid[data-pl="1"]');
const pl2Grid = document.querySelector('.grid[data-pl="2"]');
const pl1Cells = Array.from(document.querySelectorAll('.cell[data-pl="1"]'));
const pl2Cells = Array.from(document.querySelectorAll('.cell[data-pl="2"]'));
const pl1Message = document.querySelector('.message-text[data-pl="1"]');
const pl2Message = document.querySelector('.message-text[data-pl="2"]');
const pl1ReadyBtn = document.querySelector('.ready-btn[data-pl="1"]');
const pl2ReadyBtn = document.querySelector('.ready-btn[data-pl="2"]');

// Instantiate players
const PLAYER_1 = new Player(
  1,
  pl1Board,
  pl1Grid,
  pl1Cells,
  pl1Message,
  pl1ReadyBtn
);
const PLAYER_2 = new Player(
  2,
  pl2Board,
  pl2Grid,
  pl2Cells,
  pl2Message,
  pl2ReadyBtn
);

let turn;
gameMessage.classList.add("show");
restartBtn.addEventListener("click", startGame, { once: true });

// Start game
function startGame() {
  console.log("startGame");
  turn = true;
  gameMessage.classList.remove("show");
  cells.forEach((cell) => {
    cell.classList.remove("ship");
    cell.classList.remove("shot");
    cell.classList.remove("hit");
  });
  placeShips();
}

// Get the current player
function getCurrentPlayer(turn) {
  console.log("getCurrentPlayer");
  currentPlayer = turn ? PLAYER_1 : PLAYER_2;
  inactivePlayer = turn ? PLAYER_2 : PLAYER_1;
  return [currentPlayer, inactivePlayer];
}

function placeShips() {
  console.log("placeShips");
  const [currentPlayer, inactivePlayer] = getCurrentPlayer(turn);
  setCurrentBoard(currentPlayer, inactivePlayer);
  displayReadyMessage(currentPlayer, inactivePlayer);
  if ((PLAYER_1.ready == true) & (PLAYER_2.ready == true)) {
    startTurns();
  } else {
    currentPlayer.grid.addEventListener("click", placeShipMark);
  }
}

// Display ready message
function displayReadyMessage(currentPlayer, inactivePlayer) {
  console.log("displayReadyMessage");
  const messageText = `Player ${currentPlayer.id}, Click on the grid to place your ship. click 'Ready' when done`;
  currentPlayer.message.textContent = messageText;
  inactivePlayer.message.textContent = "";
}

// Place individual marks for the ships
function placeShipMark(e) {
  console.log(`placeShipMark ${currentPlayer.id}`);
  const cell = e.target;
  cell.classList.add("ship");
  currentPlayer.ships.push(cell.dataset.id);
  currentPlayer.readyBtn.addEventListener("click", playerReady, { once: true });
}

function playerReady() {
  console.log("playerReady");
  currentPlayer.ready = true;
  currentPlayer.grid.removeEventListener("click", placeShipMark);
  swapTurns();
  setCurrentBoard(currentPlayer, inactivePlayer);
  placeShips();
}

function swapTurns() {
  console.log("swapTurns");
  turn = !turn;
}
// Set the grid hover color for current player
function setCurrentBoard(currentPlayer, inactivePlayer) {
  console.log("setPlayerBoard");
  // Display Current Player Items
  currentPlayer.board.classList.add("active");
  currentPlayer.cells.forEach((cell) => {
    // Display current player ships
    currentPlayer.ships.forEach((ship) => {
      if (cell.dataset.id === ship) {
        cell.classList.remove(`ship`);
      }
    });

    // Display current player shots
    currentPlayer.shots.forEach((shot) => {
      if (cell.dataset.id === shot) {
        cell.classList.add(`shot`);
      }
    });

    // Display current player shots
    currentPlayer.hits.forEach((hit) => {
      if (cell.dataset.id === hit) {
        cell.classList.add(`hit`);
      }
    });
  });

  // Hide Inactive Player Items
  inactivePlayer.board.classList.remove("active");
  inactivePlayer.cells.forEach((cell) => {
    // Display current player ships
    inactivePlayer.ships.forEach((ship) => {
      if (cell.dataset.id === ship) {
        cell.classList.remove(`ship`);
      }
    });

    // Display current player shots
    inactivePlayer.shots.forEach((shot) => {
      if (cell.dataset.id === shot) {
        cell.classList.add(`shot`);
      }
    });

    // Display current player shots
    inactivePlayer.hits.forEach((hit) => {
      if (cell.dataset.id === hit) {
        cell.classList.add(`hit`);
      }
    });
  });
}

function startTurns() {
  console.log("startTurns");
  [currentPlayer, inactivePlayer] = getCurrentPlayer(turn);
  console.log(`current player: ${currentPlayer.id}`);
  displayTurnsMessage(currentPlayer, inactivePlayer);
  setCurrentBoard(currentPlayer, inactivePlayer);
  console.log(`player one ships: ${PLAYER_1.ships}`);
  console.log(`player two ships: ${PLAYER_2.ships}`);
}

function displayTurnsMessage(currentPlayer, inactivePlayer) {
  currentPlayer.message.textContent = `Player ${currentPlayer.id}, Click on the grid to place your shot`;
  inactivePlayer.message.textContent = "";
}
