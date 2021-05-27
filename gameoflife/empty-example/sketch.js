const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const SQUARE_SIDE_SIZE = SCREEN_WIDTH / 200;

let startButton;
let pauseButton;
let clearButton;
let overlay;

var squares = [];
var aliveNextStep = [];

var gameRunning = false;

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

// function mousePressed() {
//   if (gameRunning === false) {
//     let firstCor = Math.floor(mouseX / SQUARE_SIDE_SIZE);
//     let secondCor = Math.floor(mouseY / SQUARE_SIDE_SIZE);
//     if (squares[firstCor][secondCor]) {
//       squares[firstCor][secondCor].clicked();
//     }
//   }
// }

function draw() {
  if (mouseIsPressed && gameRunning === false) {
    let firstCor = Math.floor(mouseX / SQUARE_SIDE_SIZE);
    let secondCor = Math.floor(mouseY / SQUARE_SIDE_SIZE);
    if (squares[firstCor][secondCor]) {
      squares[firstCor][secondCor].clicked();
      setNewSmallestAndBiggestAlive(firstCor, secondCor);
    }
  }

  if (gameRunning === true) {
    oneStep();
  }

  // squares.forEach((element) => {
  //   element.forEach((el) => {
  //     if (el.isAlive) {
  //       el.display();
  //     }
  //   });
  // });
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
      // else default case: has 2 or 3 alive neighbors and is alive itself --> kept alive in next step
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
  for (let k = i - 1; k <= i + 1 && k < squares.length && k >= 0; k++) {
    for (let l = j - 1; l <= j + 1 && l < squares[k].length && l >= 0; l++) {
      if (squares[k][l] && (k !== i || l !== j) && squares[k][l].isAlive) {
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
  setInitialBorders()
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
