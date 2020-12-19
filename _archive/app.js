//  GET DOM ELEMENTS
//// Grid elements
const topBar = document.querySelector(".top-bar");
const sideBar = document.querySelector(".side-bar");
const grid = document.querySelector(".grid");
const cells = Array.from(document.querySelectorAll(".cell"));

//// Ship elements
const ships = Array.from(document.querySelectorAll(".ship"));

const cruiser = document.querySelector(".cruiser");
const destroyer = document.querySelector(".destroyer");

const cruiserBtn = document.querySelector(".cruiser-btn");
const destroyerBtn = document.querySelector(".destroyer-btn");
//----------------------------------------------------------------//

// DECALRE GLOBALS
//// Column Labels
const columnLabels = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
// Grid cells
//const cells = [];

//// Grid dimensions
const height = 10;
const width = 10;
//----------------------------------------------------------------//

// CREATE GRID
function createGrid() {
  // Build main grid area
  for (let i = 0; i < width * height; i++) {
    var cell = document.createElement("div");
    // Give each cell an id
    cell.setAttribute("data-id", i);
    cell.setAttribute("class", "cell");
    grid.appendChild(cell);
  }

  // Build top bar
  for (let i = 0; i < columnLabels.length; i++) {
    var topLabel = document.createElement("div");
    topLabel.textContent = columnLabels[i];
    topBar.appendChild(topLabel);
  }

  // Build side bar
  for (i = 1; i < 11; i++) {
    var sideLabel = document.createElement("div");
    sideLabel.textContent = i;
    sideBar.appendChild(sideLabel);
  }
}

createGrid();
//----------------------------------------------------------------//

// ROTATE SHIPS
//// Set inital state of ships to horizontal
ships.forEach((ship) => {
  ship.classList.add("horizontal");
});

//// Set flags
let cruiserFlipped = false;
let destroyerFlipped = false;

cruiserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!cruiserFlipped) {
    cruiser.classList.remove("horizontal");
    cruiser.classList.add("vertical");
    cruiserFlipped = true;
  } else {
    cruiser.classList.remove("vertical");
    cruiser.classList.add("horizontal");
    cruiserFlipped = false;
  }
});

destroyerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!destroyerFlipped) {
    destroyer.classList.remove("horizontal");
    destroyer.classList.add("vertical");
    destroyerFlipped = true;
  } else {
    destroyer.classList.remove("vertical");
    destroyer.classList.add("horizontal");
    destroyerFlipped = false;
  }
});
//----------------------------------------------------------------//

// PLACE SHIPS ON BOARD (replace cell colors with ship color)
//// Get variables

// Make ships draggable
ships.forEach((ship) => ship.setAttribute("draggable", true));
//// Get events
// ships.forEach((ship) => ship.addEventListener("drag", drag));
// ships.forEach((ship) => ship.addEventListener("dragstart", dragStart));
// ships.forEach((ship) => ship.addEventListener("dragend", dragEnd));
// ships.forEach((ship) => ship.addEventListener("drop", drop));
// ships.forEach((ship) => ship.addEventListener("dragover", dragOver));
// ships.forEach((ship) => ship.addEventListener("dragenter", dragEnter));
// cells.forEach((cell) => cell.addEventListener("drop", allowDrop));
// cells.forEach((cell) => cell.addEventListener("dragover", dragOver));
// cells.forEach((cell) => cell.addEventListener("dragenter", dragEnter));

// function drag() {}

// function dragStart() {
//   shipMoved = this.id;
//   this.style.backgroundColor = "red";
//   console.log(shipMoved);
// }

// function dragEnd(e) {
//   e.preventDefault();
//   this.style.backgroundColor = "";
//   console.log(e.target.className);
// }

// function dragOver(e) {
//   e.preventDefault();
//   console.log(e.target.className);
// }

// function drop() {
//   e.preventDefault();
//   // Replace color of drop target
//   console.log(e.target.className);
// }

// function dragEnter(e) {
//   e.preventDefault();
//   console.log(e.target.className);
// }

// function allowDrop(e) {
//   e.preventDefault();
// }
var dragged;
var small = document.querySelector("#small");

(ships, cells).forEach((item) =>
  item.addEventListener("drag", function (e) {}, false)
);
ships.forEach((ship) =>
  ship.addEventListener(
    "dragstart",
    function (e) {
      dragged = e.target;
      // set background color of dragged ship to green
      e.target.style.backgroundColor = "green";
    },
    false
  )
);
ships.forEach((ship) =>
  ship.addEventListener(
    "dragend",
    function (e) {
      // reset background color
      e.target.style.backgroundColor = "";
    },
    false
  )
);
document.addEventListener(
  "dragover",
  function (e) {
    e.preventDefault();
  },
  false
);

document.addEventListener(
  "dragenter",
  function (e) {
    if (e.target.className == "cell") e.target.style.background = "purple";
  },
  false
);

document.addEventListener("dragleave", function (e) {
  // reset background color if not dropped
  e.target.style.background = "";
});

document.addEventListener("drop", function (e) {
  e.preventDefault();
  // drop ship into grid
  if (e.target.className == "cell") {
    e.target.style.background = "gray";
    dragged.parentNode.removeChild(dragged);
    e.target.appendChild(dragged);
  }
});
