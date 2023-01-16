var squares = [];

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
    toUpdate = cellsToUpdate();
    toInsert = [];
    toRemove = [];
    toUpdate.forEach((el) => el.update(toInsert, toRemove));
    for (cell of toInsert) {
        cell.setAlive();
    }
    for (cell of toRemove) {
        cell.kill();
    }
}

function getLivingNeighborCount(i, j) {
    let livingCount = 0;
    for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
            m = xIndexOf(k);
            n = yIndexOf(l);
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

function xIndexOf(i) {
    l = squares.length;
    return ((i % l) + l) % l;
}

function yIndexOf(j) {
    l = squares[0].length;
    return ((j % l) + l) % l;
}

function clearField() {
    squares.forEach((element) => {
        element.forEach((el) => {
            el.init();
        });
    });
}
