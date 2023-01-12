const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const SQUARE_SIDE_SIZE = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) / 100;

// const INITIAL_SMALLEST = SCREEN_WIDTH * 10;
// const INITIAL_BIGGEST = 0;
// var smallestAliveX = INITIAL_SMALLEST;
// var smallestAliveY = INITIAL_SMALLEST;
// var biggestAliveX = INITIAL_BIGGEST;
// var biggestAliveY = INITIAL_BIGGEST;

// const MARGIN_AROUND_SMALLEST_BIGGEST = 10;

const fr = 30;

let quadTree;

let recta;

function setup() {
    let cv = createCanvas(window.innerWidth, window.innerHeight);
    cv.mouseClicked(mouseClicked);
    background(0);
    setFrameRate(fr);

    initHud();

    buttons.forEach((el) => {
        el.mouseOver(toggleDraw);
        el.mouseOut(toggleDraw);
    });

    initCells();

    quadTree = new QuadTree(
        new CellCoordinate(0, 0),
        new CellCoordinate(squares.length, squares[0].length)
    );
}

function mouseDragged() {
    if (gameState === state.paused && mouseIsPressed && currentlyDrawing) {
        mouseDraw();
    }
}

function mouseClicked() {
    if (gameState === state.paused && currentlyDrawing) {
        mouseDraw();
    }
}

function draw() {
    // quadTree.show(0, 0, 0);
    // if (gameState === state.paused && mouseIsPressed && currentlyDrawing) {
    //     mouseDraw();
    // }
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
                // setNewSmallestAndBiggestAlive(firstCor, secondCor);
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
                // specialFormations.push(glider);
                glider.setAlive();
                // setNewSmallestAndBiggestAlive(firstCor - 5, secondCor - 5);
                // setNewSmallestAndBiggestAlive(firstCor + 5, secondCor + 5);
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
                // specialFormations.push(glider);
                glider.setAlive();
                // setNewSmallestAndBiggestAlive(firstCor - 5, secondCor - 5);
                // setNewSmallestAndBiggestAlive(firstCor + 10, secondCor + 10);
            }
            break;
    }
}

// function setInitialBorders() {
//     smallestAliveX = INITIAL_SMALLEST;
//     smallestAliveY = INITIAL_SMALLEST;
//     biggestAliveX = INITIAL_BIGGEST;
//     biggestAliveY = INITIAL_BIGGEST;
// }

// function setNewSmallestAndBiggestAlive(i, j) {
//     smallestAliveX = Math.min(i, smallestAliveX);
//     smallestAliveY = Math.min(j, smallestAliveY);
//     biggestAliveX = Math.max(i, biggestAliveX);
//     biggestAliveY = Math.max(j, biggestAliveY);
// }

function setFrameRate(newFr) {
    frameRate(newFr);
}
