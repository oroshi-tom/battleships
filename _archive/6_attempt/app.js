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
  setCurrentBoard(currentPlayer, inactivePlayer);
  displayReadyMessage(currentPlayer);
  if (currentPlayer.id == 1) {
    pl1Grid.addEventListener("click", placeShipMark);
  } else {
    pl2Grid.addEventListener("click", placeShipMark);
  }
}

// Get the current player
function getCurrentPlayer(turn) {
  console.log("getCurrentPlayer");
  currentPlayer = turn ? PLAYER_1 : PLAYER_2;
  inactivePlayer = turn ? PLAYER_2 : PLAYER_1;
  return [currentPlayer, inactivePlayer];
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

// Place individual marks for the ships
function placeShipMark(e) {
  console.log(`placeShipMark ${currentPlayer.id}`);
  const cell = e.target;
  cell.classList.add("ship");
  currentPlayer.ships.push(cell.dataset.id);
  if (currentPlayer.id == 1) {
    pl1ReadyBtn.addEventListener("click", playerReady, { once: true });
  } else {
    pl2ReadyBtn.addEventListener("click", playerReady, { once: true });
  }
}

function playerReady() {
  console.log("playerReady");
  currentPlayer.ready = true;
  if (currentPlayer.id == 1) {
    pl1Grid.removeEventListener("click", placeShipMark);
  } else {
    pl2Grid.removeEventListener("click", placeShipMark);
  }
  swapTurns();
}

function swapTurns() {
  console.log("swapTurns");
  turn = !turn;
}
// Set the grid hover color for current player
function setCurrentBoard(currentPlayer, inactivePlayer) {
  console.log("setPlayerBoard");
  // Highlight current player board
  if (currentPlayer.id == 1) {
    pl1Board.classList.add("active");
    pl2Board.classList.remove("active");
  } else {
    pl2Board.classList.add("active");
    pl1Board.classList.remove("active");
  }

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
