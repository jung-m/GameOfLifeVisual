const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const SQUARE_SIDE_SIZE = SCREEN_WIDTH / 150;

let startButton;
let pauseButton;
let clearButton;
let fillRandomButton;
let gliderDrawButton;
let heavyGliderDrawButton;
let overlay;

var squares = [];
var aliveNextStep = [];

var specialFormations = [];

var gameRunning = false;
var drawingGlider = false;
var drawingHeavyGlider = false;

// var shapeDrawnCurrently = ["CELL": 0, "GLIDER": 1, "HEAVY_GLIDER": 2]

const INITIAL_SMALLEST = SCREEN_WIDTH * 10;
const INITIAL_BIGGEST = 0;
var smallestAliveX = INITIAL_SMALLEST;
var smallestAliveY = INITIAL_SMALLEST;
var biggestAliveX = INITIAL_BIGGEST;
var biggestAliveY = INITIAL_BIGGEST;

const MARGIN_AROUND_SMALLEST_BIGGEST = 10;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);

  overlay = createElement("overlay");
  overlay.class("overlay");

  startButton = createButton("Start");
  startButton.class("baseButton");
  startButton.parent(overlay);
  startButton.mousePressed(startGame);

  pauseButton = createButton("Pause");
  pauseButton.class("baseButton");
  pauseButton.parent(overlay);
  pauseButton.mousePressed(pauseGame);

  clearButton = createButton("Clear");
  clearButton.class("baseButton");
  clearButton.parent(overlay);
  clearButton.mousePressed(clearField);

  fillRandomButton = createButton("Fill the field randomly");
  fillRandomButton.class("baseButton");
  fillRandomButton.parent(overlay);
  fillRandomButton.mousePressed(initializeRandom);

  gliderDrawButton = createButton("Toggle glider draw");
  gliderDrawButton.class("baseButton");
  gliderDrawButton.parent(overlay);
  gliderDrawButton.mousePressed(toggleGliderDraw);

  heavyGliderDrawButton = createButton("Toggle heavy glider draw");
  heavyGliderDrawButton.class("baseButton");
  heavyGliderDrawButton.parent(overlay);
  heavyGliderDrawButton.mousePressed(toggleHeavyGliderDraw);

  let firstCoorCount = 0;
  let secondCoorCount = 0;
  for (let i = 0; i < SCREEN_WIDTH; i += SQUARE_SIDE_SIZE) {
    secondCoorCount = 0;
    squares[firstCoorCount] = [];
    for (let j = 0; j < SCREEN_HEIGHT; j += SQUARE_SIDE_SIZE) {
      squares[firstCoorCount][secondCoorCount] = new Cell(
        i,
        j,
        SQUARE_SIDE_SIZE
      );
      secondCoorCount++;
    }
    firstCoorCount++;
  }
  console.log(squares);
}

function draw() {
  let firstCor = Math.floor(mouseX / SQUARE_SIDE_SIZE);
  let secondCor = Math.floor(mouseY / SQUARE_SIDE_SIZE);
  if (mouseIsPressed && gameRunning === false && drawingHeavyGlider === true) {
    if (
      squares[firstCor][secondCor] &&
      firstCor > 5 &&
      secondCor > 5 &&
      firstCor < squares.length - 10 &&
      secondCor < squares[firstCor].length - 10
    ) {
      let glider = new HeavyGlider(firstCor, secondCor, squares);
      specialFormations.push(glider);
      glider.display();
      setNewSmallestAndBiggestAlive(firstCor - 5, secondCor - 5);
      setNewSmallestAndBiggestAlive(firstCor + 10, secondCor + 10);
    }
  } else if (
    mouseIsPressed &&
    gameRunning === false &&
    drawingGlider === true
  ) {
    if (
      squares[firstCor][secondCor] &&
      firstCor > 5 &&
      secondCor > 5 &&
      firstCor < squares.length - 5 &&
      secondCor < squares[firstCor].length - 5
    ) {
      let glider = new Glider(firstCor, secondCor, squares);
      specialFormations.push(glider);
      glider.display();
      setNewSmallestAndBiggestAlive(firstCor - 5, secondCor - 5);
      setNewSmallestAndBiggestAlive(firstCor + 5, secondCor + 5);
    }
  } else if (mouseIsPressed && gameRunning === false) {
    if (squares[firstCor][secondCor]) {
      squares[firstCor][secondCor].clicked();
      setNewSmallestAndBiggestAlive(firstCor, secondCor);
    }
  }

  if (gameRunning === true) {
    oneStep();
  }
}

function oneStep() {
  for (
    let i = Math.max(smallestAliveX - MARGIN_AROUND_SMALLEST_BIGGEST, 0);
    i < squares.length && i <= biggestAliveX + MARGIN_AROUND_SMALLEST_BIGGEST;
    i++
  ) {
    aliveNextStep[i] = [];
    for (
      let j = Math.max(smallestAliveY - MARGIN_AROUND_SMALLEST_BIGGEST, 0);
      j < squares[i].length &&
      j <= biggestAliveY + MARGIN_AROUND_SMALLEST_BIGGEST;
      j++
    ) {
      let livingNeighborCount = getLivingNeighborCount(i, j);
      if (squares[i][j].isAlive === false && livingNeighborCount === 3) {
        aliveNextStep[i][j] = true;
      } else if (
        squares[i][j].isAlive === true &&
        livingNeighborCount >= 2 &&
        livingNeighborCount <= 3
      ) {
        aliveNextStep[i][j] = true;
      } else if (squares[i][j].isAlive === true && livingNeighborCount < 2) {
        aliveNextStep[i][j] = false;
      } else if (squares[i][j].isAlive === true && livingNeighborCount > 3) {
        aliveNextStep[i][j] = false;
      }
    }
  }

  var tempsmallestAliveX = smallestAliveX;
  var tempsmallestAliveY = smallestAliveY;
  var tempbiggestAliveX = biggestAliveX;
  var tempbiggestAliveY = biggestAliveY;
  for (
    let i = Math.max(smallestAliveX - MARGIN_AROUND_SMALLEST_BIGGEST, 0);
    i < squares.length && i <= biggestAliveX + MARGIN_AROUND_SMALLEST_BIGGEST;
    i++
  ) {
    for (
      let j = Math.max(smallestAliveY - MARGIN_AROUND_SMALLEST_BIGGEST, 0);
      j < squares[i].length &&
      j <= biggestAliveY + MARGIN_AROUND_SMALLEST_BIGGEST;
      j++
    ) {
      if (aliveNextStep[i][j] === true) {
        squares[i][j].setAlive();
        tempsmallestAliveX = Math.min(i, smallestAliveX);
        tempsmallestAliveY = Math.min(j, smallestAliveY);
        tempbiggestAliveX = Math.max(i, biggestAliveX);
        tempbiggestAliveY = Math.max(j, biggestAliveY);
      } else {
        squares[i][j].kill();
      }
    }
  }
  setNewSmallestAndBiggestAlive(tempsmallestAliveX, tempsmallestAliveY);
  setNewSmallestAndBiggestAlive(tempbiggestAliveX, tempbiggestAliveY);
}

function getLivingNeighborCount(i, j) {
  let livingCount = 0;
  for (let k = i - 1; k <= i + 1; k++) {
    for (let l = j - 1; l <= j + 1; l++) {
      let p = squares.length;
      m = ((k % p) + p) % p;

      p = squares[m].length;
      n = ((l % p) + p) % p;
      if (squares[m][n] && (m !== i || n !== j) && squares[m][n].isAlive) {
        livingCount++;
      }
    }
  }
  return livingCount;
}

function startGame() {
  gameRunning = true;
}

function pauseGame() {
  gameRunning = false;
}

function clearField() {
  pauseGame();
  squares.forEach((element) => {
    element.forEach((el) => {
      el.kill();
    });
  });
  setInitialBorders();
}

function initializeRandom() {
  clearField();
  for (let k = 0; k < squares.length; k++) {
    for (let l = 0; l < squares[k].length; l++) {
      let randChance = Math.random();
      if (randChance > 0.7) {
        squares[k][l].setAlive();
        setNewSmallestAndBiggestAlive(k, l);
      }
    }
  }
}

function setInitialBorders() {
  smallestAliveX = INITIAL_SMALLEST;
  smallestAliveY = INITIAL_SMALLEST;
  biggestAliveX = INITIAL_BIGGEST;
  biggestAliveY = INITIAL_BIGGEST;
}

function setNewSmallestAndBiggestAlive(i, j) {
  smallestAliveX = Math.min(i, smallestAliveX);
  smallestAliveY = Math.min(j, smallestAliveY);
  biggestAliveX = Math.max(i, biggestAliveX);
  biggestAliveY = Math.max(j, biggestAliveY);
}

function toggleGliderDraw() {
  drawingGlider = !drawingGlider;
  if (drawingGlider) {
    gliderDrawButton.style(
      "backgroundImage",
      "radial-gradient(green, darkgreen)"
    );
    gliderDrawButton.mouseOver(() => {
      gliderDrawButton.style(
        "backgroundImage",
        "radial-gradient(rgb(1, 100, 1), rgb(1, 80, 1))"
      );
    });
    gliderDrawButton.mouseOut(() => {
      gliderDrawButton.style(
        "backgroundImage",
        "radial-gradient(green, darkgreen)"
      );
    });
  } else {
    gliderDrawButton.style(
      "backgroundImage",
      "radial-gradient(gold, darkgoldenrod)"
    );
    gliderDrawButton.mouseOver(() => {
      gliderDrawButton.style(
        "backgroundImage",
        "radial-gradient(rgb(134, 99, 9), rgb(134, 99, 9))"
      );
    });
    gliderDrawButton.mouseOut(() => {
      gliderDrawButton.style(
        "backgroundImage",
        "radial-gradient(gold, darkgoldenrod)"
      );
    });
  }
}

function toggleHeavyGliderDraw() {
  drawingHeavyGlider = !drawingHeavyGlider;
  if (drawingHeavyGlider) {
    heavyGliderDrawButton.style(
      "backgroundImage",
      "radial-gradient(green, darkgreen)"
    );
    heavyGliderDrawButton.mouseOver(() => {
      heavyGliderDrawButton.style(
        "backgroundImage",
        "radial-gradient(rgb(1, 100, 1), rgb(1, 80, 1))"
      );
    });
    heavyGliderDrawButton.mouseOut(() => {
      heavyGliderDrawButton.style(
        "backgroundImage",
        "radial-gradient(green, darkgreen)"
      );
    });
  } else {
    heavyGliderDrawButton.style(
      "backgroundImage",
      "radial-gradient(gold, darkgoldenrod)"
    );
    heavyGliderDrawButton.mouseOver(() => {
      heavyGliderDrawButton.style(
        "backgroundImage",
        "radial-gradient(rgb(134, 99, 9), rgb(134, 99, 9))"
      );
    });
    heavyGliderDrawButton.mouseOut(() => {
      heavyGliderDrawButton.style(
        "backgroundImage",
        "radial-gradient(gold, darkgoldenrod)"
      );
    });
  }
}
