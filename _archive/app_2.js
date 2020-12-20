// Get Dom elements
//#################
const grid = document.querySelector(".grid");
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

// Intial Setup
//#############
///// Display current player
currtentPlayerDisplay.textContent = currentPlayer;

// Start player turn
startBtn.addEventListener("click", (e) => {
  startBtn.classList.toggle("closed");
  destroyerBtn.classList.toggle("closed");
  cruiserBtn.classList.toggle("closed");
});

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
  }
}

createBoard();
//--------------------------------------------------------------------//
// Start Turn
function placeShips() {
  // Place ships on board
  //#####################
  let currentCellId;
  let nextCellId;

  //// Listen for button events, only allow one click
  destroyerBtn.addEventListener("click", placeDestroyer);
  cruiserBtn.addEventListener("click", placeCruiser);

  //// Get list of cells
  const cells = Array.from(document.querySelectorAll(".cell"));

  //// Add destoyer to grid
  function placeDestroyer() {
    destroyerBtn.style.background = "gray";
    cells.forEach((cell) => cell.addEventListener("click", placeFirstBlock));

    // Place first block
    function placeFirstBlock(e) {
      e.preventDefault();

      // Get id of cell clicked, as int
      currentCellId = parseInt(e.target.dataset.id);

      cells[currentCellId].style.background = "gray";
      // Define valid cells
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

      // highlight valid cells
      validCells.forEach(
        (cell) =>
          (((cells[cell].style.background = "green"),
          cells[cell]).style.opacity = 0.5)
      );
      // Stop listening for clicks on cells from addFirstBlock
      cells.forEach((cell) =>
        cell.removeEventListener("click", placeFirstBlock)
      );

      // Add listener to cells for adding second block
      cells.forEach((cell) => cell.addEventListener("click", placeSecondBlock));

      // Place the second block
      function placeSecondBlock(e) {
        e.preventDefault();

        // Remove valid cell highlighting
        validCells.forEach(
          (cell) =>
            (((cells[cell].style.background = ""),
            cells[cell]).style.opacity = 1)
        );
        // get id of second cell
        nextCellId = parseInt(e.target.dataset.id);

        // If second cell id is valid, then true
        let validCell = validCells.includes(nextCellId);

        if (validCell) {
          // Color the cell gray
          cells[nextCellId].style.background = "gray";

          // Stop listening for clicks on cells from addSecondBlock
          cells.forEach((cell) =>
            cell.removeEventListener("click", placeSecondBlock)
          );

          let direction;
          //// Get direction, and fill in the rest of the ship
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
          // Toggle color of button
          destroyerBtn.classList.toggle("closed");
        }
      }
    }
  }

  function placeCruiser() {
    cruiserBtn.style.background = "gray";
    cells.forEach((cell) => cell.addEventListener("click", placeFirstBlock));

    // Place first block
    function placeFirstBlock(e) {
      e.preventDefault();
      // Get id of cell clicked, as int
      currentCellId = parseInt(e.target.dataset.id);
      cells[currentCellId].style.background = "gray";
      // Define valid cells
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

      // highlight valid cells
      validCells.forEach(
        (cell) =>
          (((cells[cell].style.background = "green"),
          cells[cell]).style.opacity = 0.5)
      );

      // Stop listening for clicks on cells from addFirstBlock
      cells.forEach((cell) =>
        cell.removeEventListener("click", placeFirstBlock)
      );

      // Add listener to cells for adding second block
      cells.forEach((cell) => cell.addEventListener("click", placeSecondBlock));

      // Place the second block
      function placeSecondBlock(e) {
        e.preventDefault();

        // Remove valid cell highlighting
        validCells.forEach(
          (cell) =>
            (((cells[cell].style.background = ""),
            cells[cell]).style.opacity = 1)
        );
        // get id of second cell
        nextCellId = parseInt(e.target.dataset.id);

        // If second cell id is valid, then true
        let validCell = validCells.includes(nextCellId);

        if (validCell) {
          // Color the cell gray
          cells[nextCellId].style.background = "gray";

          // Stop listening for clicks on cells from addSecondBlock
          cells.forEach((cell) =>
            cell.removeEventListener("click", placeSecondBlock)
          );
          cruiserBtn.classList.add("closed");
        }
      }
    }
  }
}

placeShips();
// End Turn and switch over to other player
endBtn.addEventListener("click", () => {
  if (currentPlayer == 1) currentPlayer = 2;
  else if (currentPlayer == 2) currentPlayer = 1;
  ///// Display current player
  currtentPlayerDisplay.textContent = currentPlayer;
  endBtn.classList.toggle("closed");
  startBtn.classList.toggle("closed");
});
