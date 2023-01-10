function Cell(x, y, cellCoord, sizeOfSide) {
    this.upperLeftX = x;
    this.upperLeftY = y;
    this.coord = cellCoord;
    this.col = color(0, 0, 0);
    this.aliveWindow = [false, false];
    // this.isAlive = false;
    // this.isAliveNextStep = false;

    this.init = function () {
        this.aliveWindow = [false, false];
        this.kill();
    };

    this.display = function () {
        fill(this.col);
        square(this.upperLeftX, this.upperLeftY, sizeOfSide);
    };

    this.clicked = function () {
        // this.setAlive();
        this.setAlive();
    };

    this.setAlive = function () {
        // this.isAlive = true;
        this.aliveWindow[aliveWindowIndex] = true;
        this.aliveDisplay();
    };

    this.kill = function () {
        // this.isAlive = false;
        this.aliveWindow[aliveWindowIndex] = false;
        this.killedDisplay();
    };

    this.aliveDisplay = function () {
        this.col = color(255, 255, 255);
        this.display();
    };

    this.killedDisplay = function () {
        this.col = color(0, 0, 0);
        this.display();
    };

    this.update = function () {
        let livingNeighborCount = getLivingNeighborCount(
            this.coord.x,
            this.coord.y
        );
        if (
            this.aliveWindow[aliveWindowIndex] === false &&
            livingNeighborCount === 3
        ) {
            this.aliveWindow[newAliveWindowIndex()] = true;
        } else if (
            this.aliveWindow[aliveWindowIndex] === true &&
            livingNeighborCount >= 2 &&
            livingNeighborCount <= 3
        ) {
            this.aliveWindow[newAliveWindowIndex()] = true;
        } else if (
            this.aliveWindow[aliveWindowIndex] === true &&
            livingNeighborCount < 2
        ) {
            this.aliveWindow[newAliveWindowIndex()] = false;
        } else if (
            this.aliveWindow[aliveWindowIndex] === true &&
            livingNeighborCount > 3
        ) {
            this.aliveWindow[newAliveWindowIndex()] = false;
        } else {
            this.aliveWindow[newAliveWindowIndex()] = false;
        }

        this.updateDisplayStatus();
    };

    this.updateDisplayStatus = function () {
        if (this.aliveWindow[newAliveWindowIndex()] === true) {
            this.aliveDisplay();
        } else {
            this.killedDisplay();
        }
    };
}
