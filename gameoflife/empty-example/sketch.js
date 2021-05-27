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

function mousePressed() {
  if (gameRunning === false) {
    let firstCor = Math.floor(mouseX / SQUARE_SIDE_SIZE);
    let secondCor = Math.floor(mouseY / SQUARE_SIDE_SIZE);
    if (squares[firstCor][secondCor]) {
      squares[firstCor][secondCor].clicked();
    }
  }
}

function draw() {
  if (mouseIsPressed && gameRunning === false) {
    let firstCor = Math.floor(mouseX / SQUARE_SIDE_SIZE);
    let secondCor = Math.floor(mouseY / SQUARE_SIDE_SIZE);
    if (squares[firstCor][secondCor]) {
      squares[firstCor][secondCor].clicked();
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
  for (let i = 0; i < squares.length; i++) {
    aliveNextStep[i] = [];
    for (let j = 0; j < squares[i].length; j++) {
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

  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      if (aliveNextStep[i][j] === true) {
        squares[i][j].setAlive();
      } else {
        squares[i][j].kill();
      }
    }
  }
}

function getLivingNeighborCount(i, j) {
  let livingCount = 0;
  for (let k = i - 1; k <= i + 1 && k < squares.length && k >= 0; k++) {
    for (let l = j - 1; l <= j + 1 && l < squares[k].length && l >= 0; l++) {
      if (
        k >= 0 &&
        l >= 0 &&
        squares[k][l] &&
        (k !== i || l !== j) &&
        squares[k][l].isAlive
      ) {
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
}
