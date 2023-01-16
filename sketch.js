const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let SQUARE_SIDE_SIZE = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) / 150;
let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

if (isMobile) {
    SQUARE_SIDE_SIZE = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) / 40;
}

const fr = 30;

let recta;

function setup() {
    let cv = createCanvas(window.innerWidth, window.innerHeight);
    cv.addClass("canvas");
    cv.mousePressed(mouseP);
    background(0);
    setFrameRate(fr);
    initHud();
    initCells();
    initTree();
    // cellsToUpdate();
}

function mouseDragged() {
    if (gameState === state.paused && mouseIsPressed && currentlyDrawing) {
        mouseDraw();
    }
}

function mouseP() {
    if (gameState === state.paused && currentlyDrawing) {
        mouseDraw();
    }
}

function draw() {
    // quadTree.show(0, 0, 0);
    if (gameState === state.running) {
        oneStep();
    }
    // quadTree.show(255, 255, 255);
}

function mouseDraw() {
    let firstCor = Math.floor(mouseX / SQUARE_SIDE_SIZE);
    let secondCor = Math.floor(mouseY / SQUARE_SIDE_SIZE);
    switch (shapeCurrentlyDrawn) {
        case shapesToDraw.CELL:
            if (squares[firstCor][secondCor]) {
                squares[firstCor][secondCor].clicked();
            }
            break;
        case shapesToDraw.GLIDER:
            if (
                squares[firstCor][secondCor] &&
                firstCor > 5 &&
                secondCor > 5 &&
                firstCor < squares.length - 5 &&
                secondCor < squares[firstCor].length - 5
            ) {
                let glider = new Glider(firstCor, secondCor, squares);
                glider.setAlive();
            }
            break;
        case shapesToDraw.HEAVY_GLIDER:
            if (
                squares[firstCor][secondCor] &&
                firstCor > 5 &&
                secondCor > 5 &&
                firstCor < squares.length - 10 &&
                secondCor < squares[firstCor].length - 10
            ) {
                let glider = new HeavyGlider(firstCor, secondCor, squares);
                glider.setAlive();
            }
            break;
    }
}

function setFrameRate(newFr) {
    frameRate(newFr);
}
