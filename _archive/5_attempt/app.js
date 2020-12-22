//####################################################################//
// Classes
//####################################################################//
class Player {
  constructor(id) {
    this.id = id;
  }
  //ships = [];
  hitsTaken = [];
}

//####################################################################//
// Globals
//####################################################################//
const gridElement = document.querySelector(".grid");
const cellElements = [];
const topBar = document.querySelector(".top-bar");
const sideBar = document.querySelector(".side-bar");
const resetBtn = document.querySelector(".reset-btn");
const readyBtn = document.querySelector(".ready-btn");
const messageDisplay = document.querySelector(".message-board");
const messageTextElement = document.querySelector(".message-text");
const currtentPlayerDisplay = document.querySelector(".player-Id");
const topBarLabels = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const height = 10;
const width = 10;

const PLAYER_1 = new Player("one");
const PLAYER_2 = new Player("two");
const PLAYER_1_SHIP = "pl-one-ship";
const PLAYER_2_SHIP = "pl-two-ship";

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
    cell.setAttribute("data-cell", i);
    cell.className = "cell";
    gridElement.appendChild(cell);
    cellElements.push(cell);
  }
}

createBoard();

//####################################################################//
// Play Game
//####################################################################//
let turn;

startGame();
resetBtn.addEventListener("click", startGame);

function startGame() {
  console.log("startgame");

  // --! Move to placeShips()?
  // Set player turn states

  // Clean up from last game
  // grid.removeEventListener("click", placeShips);
  //cellElements.forEach((cell) => cell.classList.remove("[class~=player]"));
  cellElements.forEach((cell) => {
    cell.classList.remove(PLAYER_1_SHIP);
    cell.classList.remove(PLAYER_2_SHIP);
    cell.removeEventListener("click", placeShips);
    cell.addEventListener("click", placeShips, { once: true });
  });
  messageTextElement.textContent = `Player 1, Place your ship on the grid, click 'READY' when done`;
}

function placeShips(e) {
  turn = true;
  const cell = e.target;
  console.log("placeShips");
  const currentPlayer = turn ? PLAYER_1 : PLAYER_2;
  const inactivePlayer = turn ? PLAYER_2 : PLAYER_1;
  // Display message
  // messageTextElement.textContent = `Player ${currentPlayer.id}, Place your ship on the grid, click 'READY' when done`;
  // messageTextElement.classList.toggle("show");
  // let clickCount = 0;
  // Place Ship on grid, oly allow 3 cells

  colorShipCells(cell, currentPlayer);
  swapTurns();
  colorShipCells(cell, currentPlayer);
}

function checkReady() {
  console.log(checkReady);
  return false;
}

function startTurns() {
  console.log("startTurns");
  setBoardClass(turn);
  resetBtn.classList.remove("show");
}

function colorShipCells(cell, currentPlayer) {
  cell.classList.add(`pl-${currentPlayer.id}-ship`);
}

function takeShot() {
  console.log("takeShot");
}

function setBoardClass() {
  console.log("setBoardClass");
}

function swapTurns() {
  turn = !turn;
}
