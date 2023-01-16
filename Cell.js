function Cell(x, y, cellCoord, sizeOfSide) {
    this.upperLeftX = x;
    this.upperLeftY = y;
    this.coord = cellCoord;
    this.col = color(0, 0, 0);
    this.isAlive = false;

    this.init = function () {
        this.kill();
    };

    this.display = function () {
        fill(this.col);
        square(this.upperLeftX, this.upperLeftY, sizeOfSide);
    };

    this.clicked = function () {
        this.setAlive();
    };

    this.setAlive = function () {
        quadTree.insert(this);
        this.isAlive = true;
        this.aliveDisplay();
    };

    this.kill = function () {
        quadTree.remove(this);
        this.isAlive = false;
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

    this.update = function (newlyAlive, newlyDead) {
        let livingNeighborCount = getLivingNeighborCount(
            this.coord.x,
            this.coord.y
        );
        let aliveNextStep = false;
        if (this.isAlive === false && livingNeighborCount === 3) {
            aliveNextStep = true;
        } else if (
            this.isAlive === true &&
            livingNeighborCount >= 2 &&
            livingNeighborCount <= 3
        ) {
            aliveNextStep = true;
        } else if (this.isAlive === true && livingNeighborCount < 2) {
            aliveNextStep = false;
        } else if (this.isAlive === true && livingNeighborCount > 3) {
            aliveNextStep = false;
        } else {
            aliveNextStep = false;
        }
        if (this.isAlive && !aliveNextStep) {
            newlyDead.push(this);
        } else if (!this.isAlive && aliveNextStep) {
            newlyAlive.push(this);
        }
    };
}
