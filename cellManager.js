var squares = [];

let toInsert = [];
let toRemove = [];
let toUpdate = [];
let cellsToUpdate = new Set();

function initCells() {
    let firstCoorCount = 0;
    let secondCoorCount = 0;
    for (let i = 0; i < SCREEN_WIDTH; i += SQUARE_SIDE_SIZE) {
        secondCoorCount = 0;
        squares[firstCoorCount] = [];
        for (let j = 0; j < SCREEN_HEIGHT; j += SQUARE_SIDE_SIZE) {
            squares[firstCoorCount][secondCoorCount] = new Cell(
                i,
                j,
                new CellCoordinate(firstCoorCount, secondCoorCount),
                SQUARE_SIDE_SIZE
            );
            secondCoorCount++;
        }
        firstCoorCount++;
    }
}

function oneStep() {
    quadTree.updateRelevantCells();
    cellsToUpdate.forEach(el => el.update())
    for (cell of toInsert) {
        cell.updated = false;
        cell.setAlive();
    }
    for (cell of toRemove) {
        cell.updated = false;
        cell.kill();
    }
    toInsert = [];
    toRemove = [];
    toUpdate = [];
    cellsToUpdate = new Set();
}

function getLivingNeighborCount(i, j) {
    let livingCount = 0;
    for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
            let p = squares.length;
            m = ((k % p) + p) % p;

            p = squares[m].length;
            n = ((l % p) + p) % p;
            if (
                squares[m][n] &&
                (m !== i || n !== j) &&
                squares[m][n].isAlive
            ) {
                livingCount++;
            }
        }
    }
    return livingCount;
}

function clearField() {
    squares.forEach((element) => {
        element.forEach((el) => {
            el.init();
        });
    });
    toInsert = [];
    toRemove = [];
    toUpdate = [];
    cellsToUpdate = new Set();
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
