//import "./overlaystyle.css"

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const SQUARE_SIDE_SIZE = SCREEN_WIDTH / 200;

let startButton;
let pauseButton;
let clearButton;
let overlay;

var squares;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

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


  createSquareArray()
  console.log(squares.length)
  console.log(squares[2].length)

  let firstCoorCount = 0;
  let secondCoorCount = 0;
  for (let i = 0; i < SCREEN_WIDTH; i += SQUARE_SIDE_SIZE) {
    for (let j = 0; j < SCREEN_HEIGHT; j += SQUARE_SIDE_SIZE) {
      let s = square(i, j, SQUARE_SIDE_SIZE);
      squares[firstCoorCount][secondCoorCount] = s;
      secondCoorCount++;
    }
    firstCoorCount++;
  }
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  //ellipse(mouseX, mouseY, 80, 80);
}

function createSquareArray() {
  squares = new Array(Math.floor(SCREEN_WIDTH / SQUARE_SIDE_SIZE) + 1);
  for (let i = 0; i < squares.length; i++) {
    squares[i] = new Array(Math.floor(SCREEN_HEIGHT / SQUARE_SIDE_SIZE) + 1);
  }
}
