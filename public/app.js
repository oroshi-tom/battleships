// Player-agnostic elements
const topBars = [...document.querySelectorAll(".top-bar")];
const sideBars = [...document.querySelectorAll(".side-bar")];
const grids = [...document.querySelectorAll(".grid")];

// Player-specific elements
const pl1Board = document.querySelector('.board[data-pl="1"]');
const pl2Board = document.querySelector('.board[data-pl="2"]');
const pl1Grid = document.querySelector('.grid[data-pl="1"]');
const pl2Grid = document.querySelector('.grid[data-pl="2"]');
const pl1Message = document.querySelector('.message-text[data-pl="1"]');
const pl2Message = document.querySelector('.message-text[data-pl="2"]');
const pl1ReadyBtn = document.querySelector('.ready-btn[data-pl="1"]');
const pl2ReadyBtn = document.querySelector('.ready-btn[data-pl="2"]');

//const messageText = [...document.querySelectorAll(".message-text")];

const gameMessage = document.querySelector("#gameMessage");
const restartBtn = document.querySelector("#restartBtn");

class Player {
  constructor(id) {
    this.id = id;
  }
  ready = false;
  hits = [];
  ships = [];
  shots = [];
}

const PLAYER_1 = new Player(1);
const PLAYER_2 = new Player(2);
const height = 10;
const width = 10;
const topBarLabels = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const cells = [];

// Build Player Boards
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
      grids[a].appendChild(cell);
      cells.push(cell);
    }
  }
}

// Build the Game Board
buildGameBoard();
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
  const [currentPlayer, inactivePlayer] = getCurrentPlayer(turn);
  const [currentGrid, inactiveGrid] = getCurrentGrid(turn);
  const [currentReadyBtn, inactiveReadyBtn] = getCurrentReadyBtn(turn);
  const [currentBoard, inactiveBoard] = getCurrentBoard(turn);
  displayReadyMessage(currentPlayer);
  setCurrentBoard(currentPlayer, inactivePlayer, currentBoard, inactiveBoard);
  currentGrid.addEventListener("click", placeShipMark);
}

// function playerOneReady() {
//   pl1ReadyBtn.removeEventListener("click", playerOneReady);
//   pl1Grid.removeEventListener("click", placeShipMark);
//   pl2Grid;
//   swapTurns();
// }

// Get the current player
function getCurrentPlayer(turn) {
  console.log("getCurrentPlayer");
  currentPlayer = turn ? PLAYER_1 : PLAYER_2;
  inactivePlayer = turn ? PLAYER_2 : PLAYER_1;
  return [currentPlayer, inactivePlayer];
}

// Get the current board
function getCurrentBoard(turn) {
  console.log("getCurrentBoard");
  currentBoard = turn ? pl1Board : pl2Board;
  inactiveBoard = turn ? pl2Board : pl1Board;
  return [currentBoard, inactiveBoard];
}

// Get the current grid
function getCurrentGrid(turn) {
  console.log("getCurrentGrid");
  currentGrid = turn ? pl1Grid : pl2Grid;
  inactiveGrid = turn ? pl2Grid : pl1Grid;
  return [currentGrid, inactiveGrid];
}

// Get the current ready button
function getCurrentReadyBtn(turn) {
  console.log("getCurrentReadyBtn");
  currentReadyByn = turn ? pl1ReadyBtn : pl2ReadyBtn;
  inactiveReadyBtn = turn ? pl2ReadyBtn : pl1ReadyBtn;
  return [currentReadyByn, inactiveReadyBtn];
}

// Display ready message
function displayReadyMessage(currentPlayer) {
  console.log("displayReadyMessage");
  message = `Player ${currentPlayer.id}, Click on the grid to place your ship. click 'Ready' when done`;
  if (currentPlayer.id == 1) {
    pl1Message.textContent = message;
    pl2Message.textContent = "";
  } else {
    pl2Message.textContent = message;
    pl1Message.textContent = "";
  }
}

// Turns to place player ships
function placeShipsTurn(e) {
  console.log(`placeShipsTurn: ${currentPlayer.id}`);
  [currentPlayer, inactivePlayer] = getCurrentPlayer(turn);
  [currentGrid, inactiveGrid] = getCurrentGrid(turn);
  [currentReadyBtn, inactiveReadyBtn] = getCurrentReadyBtn(turn);
  [currentBoard, inactiveBoard] = getCurrentBoard(turn);
  cell = e.target;
  placeShipMark(cell);
  currentReadyBtn.addEventListener("click", function () {
    playerReady;
  });
}

// Place individual marks for the ships
function placeShipMark(cell) {
  console.log(`placeShipMark ${currentPlayer.id}`);
  cell.classList.add("ship");
  currentPlayer.ships.push(cell.dataset.id);
}

// Set Player ready to True, and switch current player
function playerReady() {
  console.log("playerReady");
  currentPlayer.ready = true;
  swapTurns();
  getCurrentPlayer(turn);
}

function swapTurns() {
  console.log("swapTurns");
  turn = !turn;
}
// Set the grid hover color for current player
function setCurrentBoard(
  currentPlayer,
  inactivePlayer,
  currentBoard,
  inactiveBoard
) {
  console.log("setPlayerBoard");
  // Highlight current player board
  currentBoard.classList.add("active");
  inactiveBoard.classList.remove("active");
  // if (currentPlayer.id == 1) {
  //   pl1Board.classList.add("active");
  //   pl2Board.classList.remove("active");
  // } else {
  //   pl2Board.classList.add("active");
  //   pl1Board.classList.remove("active");
  // }

  // hide other players ships, shots, and hits
  cells.forEach((cell) => {
    inactivePlayer.ships.forEach((ship) => {
      if (cell.dataset.id === ship) {
        cell.classList.remove(`ship`);
      }
    });
    inactivePlayer.shots.forEach((shot) => {
      if (cell.dataset.id === shot) {
        cell.classList.remove(`shot`);
      }
    });
    inactivePlayer.hits.forEach((hit) => {
      if (cell.dataset.id === hit) {
        cell.classList.remove(`hit`);
      }
    });
  });

  //display current player ships, shots, and hits
  cells.forEach((cell) => {
    currentPlayer.ships.forEach((ship) => {
      if (cell.dataset.id === ship) {
        cell.classList.add(`ship`);
      }
    });
    currentPlayer.shots.forEach((shot) => {
      if (cell.dataset.id === shot) {
        cell.classList.add(`shot`);
      }
    });
    currentPlayer.hits.forEach((hit) => {
      if (cell.dataset.id === hit) {
        cell.classList.add(`hit`);
      }
    });
  });
}

function displayTurnsMessage(currentPlayer) {
  message = `Player ${currentPlayer.id}, Click on the grid to place your shot. (Don't worry about hitting your own ship)`;
  messageText.textContent = message;
}

function startTurns() {
  console.log("startTurns");
  let [currentPlayer, inactivePlayer] = getCurrentPlayer(turn);
  console.log(`current player: ${currentPlayer.id}`);
  displayTurnsMessage(currentPlayer);
  setPlayerBoard(currentPlayer, inactivePlayer);
  console.log(`player one ships: ${PLAYER_1.ships}`);
  console.log(`player two ships: ${PLAYER_2.ships}`);
}
