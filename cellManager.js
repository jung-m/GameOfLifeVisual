var squares = [];
// var aliveNextStep = [];
var aliveWindowIndex = 0;

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
    var tempsmallestAliveX = smallestAliveX;
    var tempsmallestAliveY = smallestAliveY;
    var tempbiggestAliveX = biggestAliveX;
    var tempbiggestAliveY = biggestAliveY;

    for (
        let i = Math.max(smallestAliveX - MARGIN_AROUND_SMALLEST_BIGGEST, 0);
        i < squares.length &&
        i <= biggestAliveX + MARGIN_AROUND_SMALLEST_BIGGEST;
        i++
    ) {
        // aliveNextStep[i] = [];
        for (
            let j = Math.max(
                smallestAliveY - MARGIN_AROUND_SMALLEST_BIGGEST,
                0
            );
            j < squares[i].length &&
            j <= biggestAliveY + MARGIN_AROUND_SMALLEST_BIGGEST;
            j++
        ) {
            squares[i][j].update();

            if (squares[i][j].aliveWindow[newAliveWindowIndex()] === true) {
                tempsmallestAliveX = Math.min(i, smallestAliveX);
                tempsmallestAliveY = Math.min(j, smallestAliveY);
                tempbiggestAliveX = Math.max(i, biggestAliveX);
                tempbiggestAliveY = Math.max(j, biggestAliveY);
            }

            // let livingNeighborCount = getLivingNeighborCount(i, j);
            // if (squares[i][j].isAlive === false && livingNeighborCount === 3) {
            //     aliveNextStep[i][j] = true;
            // } else if (
            //     squares[i][j].isAlive === true &&
            //     livingNeighborCount >= 2 &&
            //     livingNeighborCount <= 3
            // ) {
            //     aliveNextStep[i][j] = true;
            // } else if (
            //     squares[i][j].isAlive === true &&
            //     livingNeighborCount < 2
            // ) {
            //     aliveNextStep[i][j] = false;
            // } else if (
            //     squares[i][j].isAlive === true &&
            //     livingNeighborCount > 3
            // ) {
            //     aliveNextStep[i][j] = false;
            // }
        }
    }

    setNewSmallestAndBiggestAlive(tempsmallestAliveX, tempsmallestAliveY);
    setNewSmallestAndBiggestAlive(tempbiggestAliveX, tempbiggestAliveY);

    updateAliveWindowIndex();

    // var tempsmallestAliveX = smallestAliveX;
    // var tempsmallestAliveY = smallestAliveY;
    // var tempbiggestAliveX = biggestAliveX;
    // var tempbiggestAliveY = biggestAliveY;
    // for (
    //     let i = Math.max(smallestAliveX - MARGIN_AROUND_SMALLEST_BIGGEST, 0);
    //     i < squares.length &&
    //     i <= biggestAliveX + MARGIN_AROUND_SMALLEST_BIGGEST;
    //     i++
    // ) {
    //     for (
    //         let j = Math.max(
    //             smallestAliveY - MARGIN_AROUND_SMALLEST_BIGGEST,
    //             0
    //         );
    //         j < squares[i].length &&
    //         j <= biggestAliveY + MARGIN_AROUND_SMALLEST_BIGGEST;
    //         j++
    //     ) {
    //         if (aliveNextStep[i][j] === true) {
    //             squares[i][j].setAlive();
    //             tempsmallestAliveX = Math.min(i, smallestAliveX);
    //             tempsmallestAliveY = Math.min(j, smallestAliveY);
    //             tempbiggestAliveX = Math.max(i, biggestAliveX);
    //             tempbiggestAliveY = Math.max(j, biggestAliveY);
    //         } else {
    //             squares[i][j].kill();
    //         }
    //     }
    // }
    // setNewSmallestAndBiggestAlive(tempsmallestAliveX, tempsmallestAliveY);
    // setNewSmallestAndBiggestAlive(tempbiggestAliveX, tempbiggestAliveY);
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
                squares[m][n].aliveWindow[aliveWindowIndex]
                // squares[m][n].isAlive
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
            // el.kill();
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

function updateAliveWindowIndex() {
    aliveWindowIndex = newAliveWindowIndex();
}

function newAliveWindowIndex() {
    return (aliveWindowIndex + 1) % 2;
}
