const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const SQUARE_SIDE_SIZE = SCREEN_WIDTH / 200;

let startButton;
let pauseButton;
let clearButton;
let overlay;

var squares = [];
var aliveNextStep = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0)

  overlay = createElement("overlay");
  overlay.class("overlay");

  startButton = createButton("Start");
  startButton.class("baseButton");
  startButton.parent(overlay);

  pauseButton = createButton("Pause");
  pauseButton.class("baseButton");
  pauseButton.parent(overlay);

  clearButton = createButton("Clear");
  clearButton.class("baseButton");
  clearButton.parent(overlay);

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
}

function mousePressed() {
  let firstCor = Math.floor(mouseX / SQUARE_SIDE_SIZE);
  let secondCor = Math.floor(mouseY / SQUARE_SIDE_SIZE);
  if (squares[firstCor][secondCor]) {
    squares[firstCor][secondCor].clicked();
  }
}

function draw() {
  if (mouseIsPressed) {
    let firstCor = Math.floor(mouseX / SQUARE_SIDE_SIZE);
    let secondCor = Math.floor(mouseY / SQUARE_SIDE_SIZE);
    if (squares[firstCor][secondCor]) {
      squares[firstCor][secondCor].clicked();
    }
  }

  squares.forEach((element) => {
    element.forEach((el) => {
      if (el.isAlive) {
        el.display();
      }
    });
  });
}

