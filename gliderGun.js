function GliderGun(centerCoords, squaresArray) {
    this.centerCoords = centerCoords;

    this.cells = [];

    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 18)][
            yIndexOf(this.centerCoords.y)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 17)][
            yIndexOf(this.centerCoords.y)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 18)][
            yIndexOf(this.centerCoords.y + 1)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 17)][
            yIndexOf(this.centerCoords.y + 1)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 8)][
            yIndexOf(this.centerCoords.y)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 8)][
            yIndexOf(this.centerCoords.y + 1)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 8)][
            yIndexOf(this.centerCoords.y + 2)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 7)][
            yIndexOf(this.centerCoords.y - 1)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 7)][
            yIndexOf(this.centerCoords.y + 3)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 6)][
            yIndexOf(this.centerCoords.y - 2)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 6)][
            yIndexOf(this.centerCoords.y + 4)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 5)][
            yIndexOf(this.centerCoords.y - 2)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 5)][
            yIndexOf(this.centerCoords.y + 4)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 4)][
            yIndexOf(this.centerCoords.y + 1)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 3)][
            yIndexOf(this.centerCoords.y + 3)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 3)][
            yIndexOf(this.centerCoords.y - 1)
        ]
    );
    for (let j = this.centerCoords.y; j <= this.centerCoords.y + 2; j++) {
        this.cells.push(
            squaresArray[xIndexOf(this.centerCoords.x - 2)][yIndexOf(j)]
        );
    }
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x - 1)][
            yIndexOf(this.centerCoords.y + 1)
        ]
    );
    for (let i = this.centerCoords.x + 2; i <= this.centerCoords.x + 3; i++) {
        for (let j = this.centerCoords.y - 2; j <= this.centerCoords.y; j++) {
            this.cells.push(squaresArray[xIndexOf(i)][yIndexOf(j)]);
        }
    }
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x + 4)][
            yIndexOf(this.centerCoords.y - 3)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x + 4)][
            yIndexOf(this.centerCoords.y + 1)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x + 6)][
            yIndexOf(this.centerCoords.y - 4)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x + 6)][
            yIndexOf(this.centerCoords.y - 3)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x + 6)][
            yIndexOf(this.centerCoords.y + 1)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x + 6)][
            yIndexOf(this.centerCoords.y + 2)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x + 16)][
            yIndexOf(this.centerCoords.y - 2)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x + 16)][
            yIndexOf(this.centerCoords.y - 1)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x + 17)][
            yIndexOf(this.centerCoords.y - 2)
        ]
    );
    this.cells.push(
        squaresArray[xIndexOf(this.centerCoords.x + 17)][
            yIndexOf(this.centerCoords.y - 1)
        ]
    );

    this.display = function () {
        this.cells.forEach((e) => {
            e.setAlive();
        });
    };

    this.clicked = function () {};

    this.setAlive = function () {
        this.cells.forEach((e) => {
            e.setAlive();
        });
    };

    this.kill = function () {
        this.cells.forEach((e) => {
            e.kill();
        });
    };
}
