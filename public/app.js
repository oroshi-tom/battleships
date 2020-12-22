const topBar = document.querySelector(".top-bar");
const sideBar = document.querySelector(".side-bar");
const grid = document.querySelector(".grid");
const readyBtn = document.querySelector(".ready-btn");
const startBtn = document.querySelector(".start-btn");
const messageText = document.querySelector(".message-text");
class Player {
  constructor(id) {
    this.id = id;
  }
  ready = false;
  hitsTaken = [];
  ships = [];
  shots = [];
}

const PLAYER_1 = new Player("one");
const PLAYER_2 = new Player("two");
const height = 10;
const width = 10;
const topBarLabels = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const cells = [];
// Build Grid
function buildGameBoard() {
  // Populate top bar
  for (let i = 0; i < width + 1; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("data-id", i);
    cell.textContent = topBarLabels[i];
    topBar.appendChild(cell);
  }
  // Populate side bar
  for (let i = 1; i < height + 1; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.textContent = i;
    sideBar.appendChild(cell);
  }
  // Populate grid
  for (let i = 0; i < width * height; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("data-id", i);
    grid.appendChild(cell);
    cells.push(cell);
  }
}

// Build the Game Board
buildGameBoard();
let turn;
turn = true;
startBtn.classList.add("show");
startBtn.addEventListener("click", startGame, { once: true });

// Start game
function startGame() {
  startBtn.classList.toggle("show");
  readyBtn.classList.toggle("show");
  currentPlayer = getCurrentPlayer(turn);
  inactivePlayer = getInactivePlayer(turn);
  displayReadyMessage(currentPlayer);
  setPlayerGrid(currentPlayer, inactivePlayer);
  placeShipsTurn();
}

// Get the current player
function getCurrentPlayer(turn) {
  currentPlayer = turn ? PLAYER_1 : PLAYER_2;
  return currentPlayer;
}

// Display ready message
function displayReadyMessage(currentPlayer) {
  message = `Player ${currentPlayer.id}, Click on the grid to place your ships. click 'Ready' when done`;
  messageText.textContent = message;
}

// Turns to place player ships
function placeShipsTurn() {
  grid.addEventListener("click", placeShipMark);
  console.log("placeShips");
  readyBtn.addEventListener("click", playerReady);
}

// Place individual marks for the ships
function placeShipMark(e) {
  cell = e.target;
  cell.classList.add(`pl-${currentPlayer.id}-ship`);
  currentPlayer.ships.push(cell.dataset.id);
}

function playerReady() {
  currentPlayer.ready = true;
  swapTurns();
  currentPlayer = getCurrentPlayer(turn);
  inactivePlayer = getInactivePlayer(turn);
  setPlayerGrid(currentPlayer, inactivePlayer);
  displayReadyMessage(currentPlayer);
  if (PLAYER_1.ready && PLAYER_2.ready) {
    grid.removeEventListener("click", placeShipMark);
    readyBtn.classList.toggle("show");
    startTurns();
  } else {
    readyBtn.addEventListener("click", playerReady);
  }
}

function swapTurns() {
  turn = !turn;
}
// Set the grid hover color for current player
function setPlayerGrid(currentPlayer, inactivePlayer) {
  grid.classList.add(`pl-${currentPlayer.id}`);
  grid.classList.remove(`pl-${inactivePlayer.id}`);

  // hide other players ships
  cells.forEach((cell) => {
    inactivePlayer.ships.forEach((ship) => {
      if (cell.dataset.id === ship) {
        cell.classList.remove(`pl-${inactivePlayer.id}-ship`);
      }
    });
  });

  //display current player ships
  cells.forEach((cell) => {
    currentPlayer.ships.forEach((ship) => {
      if (cell.dataset.id === ship) {
        cell.classList.add(`pl-${currentPlayer.id}-ship`);
      }
    });
  });
}

// Get the current player
function getInactivePlayer(turn) {
  inactivePlayer = turn ? PLAYER_2 : PLAYER_1;
  return inactivePlayer;
}

function displayTurnsMessage(currentPlayer) {
  message = `Player ${currentPlayer.id}, Click on the grid to place your shot. (Don't worry about hitting your own ship)`;
  messageText.textContent = message;
}

function startTurns() {
  console.log("startTurns");
  currentPlayer = getCurrentPlayer(turn);
  inactivePlayer = getInactivePlayer(turn);
  console.log(`current player: ${currentPlayer.id}`);
  displayTurnsMessage(currentPlayer);
  setPlayerGrid(currentPlayer, inactivePlayer);
  console.log(`player one ships: ${PLAYER_1.ships}`);
  console.log(`player two ships: ${PLAYER_2.ships}`);
}
