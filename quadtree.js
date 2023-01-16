const SMALLEST_RECT_SIDE = 8;

function CellCoordinate(x, y) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);

    this.halfWayTo = function (otherCoord) {
        return new CellCoordinate(
            (this.x + otherCoord.x) / 2,
            (this.y + otherCoord.y) / 2
        );
    };
}

function CellAABB(topLeft, bottomRight) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;

    this.contains = function (cell) {
        return (
            this.topLeft.x <= cell.coord.x &&
            this.topLeft.y <= cell.coord.y &&
            this.bottomRight.x > cell.coord.x &&
            this.bottomRight.y > cell.coord.y
        );
    };
}

function QuadTree(topLeft, bottomRight) {
    this.aabb = new CellAABB(topLeft, bottomRight);
    this.topLeftChild = null;
    this.bottomLeftChild = null;
    this.topRightChild = null;
    this.bottomRightChild = null;
    this.cells = [];
    this.empty = true;
    this.isLeaf = true;

    this.createChildren = function () {
        this.topLeftChild = new QuadTree(
            this.aabb.topLeft,
            new CellCoordinate(
                (this.aabb.topLeft.x + this.aabb.bottomRight.x) / 2,
                (this.aabb.topLeft.y + this.aabb.bottomRight.y) / 2
            )
        );
        this.bottomLeftChild = new QuadTree(
            new CellCoordinate(
                this.aabb.topLeft.x,
                (this.aabb.topLeft.y + this.aabb.bottomRight.y) / 2
            ),
            new CellCoordinate(
                (this.aabb.topLeft.x + this.aabb.bottomRight.x) / 2,
                this.aabb.bottomRight.y
            )
        );
        this.topRightChild = new QuadTree(
            new CellCoordinate(
                (this.aabb.topLeft.x + this.aabb.bottomRight.x) / 2,
                this.aabb.topLeft.y
            ),
            new CellCoordinate(
                this.aabb.bottomRight.x,
                (this.aabb.topLeft.y + this.aabb.bottomRight.y) / 2
            )
        );
        this.bottomRightChild = new QuadTree(
            new CellCoordinate(
                (this.aabb.topLeft.x + this.aabb.bottomRight.x) / 2,
                (this.aabb.topLeft.y + this.aabb.bottomRight.y) / 2
            ),
            this.aabb.bottomRight
        );
        this.isLeaf = false;
    };

    this.insert = function (cell) {
        if (!this.aabb.contains(cell)) {
            return false;
        }

        if (
            Math.abs(this.aabb.topLeft.x - this.aabb.bottomRight.x) <=
                SMALLEST_RECT_SIDE ||
            Math.abs(this.aabb.topLeft.y - this.aabb.bottomRight.y) <=
                SMALLEST_RECT_SIDE
        ) {
            this.cells.push(cell);
            this.empty = false;
            return true;
        }
        if (this.topLeftChild === null) {
            this.createChildren();
        }
        if (
            this.topLeftChild.insert(cell) ||
            this.bottomLeftChild.insert(cell) ||
            this.topRightChild.insert(cell) ||
            this.bottomRightChild.insert(cell)
        ) {
            this.empty = false;
            return true;
        }
    };

    this.remove = function (cell) {
        if (!this.aabb.contains(cell)) {
            return false;
        }
        if (this.cells.length > 0) {
            let newCells = [];
            for (c of this.cells) {
                if (c != cell) {
                    newCells.push(c);
                }
            }
            this.cells = newCells;
            if (this.cells.length === 0) {
                this.empty = true;
            }
            return true;
        }
        if (this.topLeftChild === null) {
            return false;
        }
        if (
            this.topLeftChild.remove(cell) ||
            this.bottomLeftChild.remove(cell) ||
            this.topRightChild.remove(cell) ||
            this.bottomRightChild.remove(cell)
        ) {
            if (
                this.topLeftChild.empty &&
                this.bottomLeftChild.empty &&
                this.topRightChild.empty &&
                this.bottomRightChild.empty
            ) {
                this.empty = true;
                this.topLeftChild = null;
                this.bottomLeftChild = null;
                this.topRightChild = null;
                this.bottomRightChild = null;
            }
            return true;
        }
    };

    this.addCellsToUpdate = function (toAddTo) {
        if (
            Math.abs(this.aabb.topLeft.x - this.aabb.bottomRight.x) <=
                SMALLEST_RECT_SIDE ||
            Math.abs(this.aabb.topLeft.y - this.aabb.bottomRight.y) <=
                SMALLEST_RECT_SIDE
        ) {
            let minW = Math.max(0, this.aabb.topLeft.x - 1);
            let minH = Math.max(0, this.aabb.topLeft.y - 1);
            let maxW = Math.min(squares.length, this.aabb.bottomRight.x + 1);
            let maxH = Math.min(squares[0].length, this.aabb.bottomRight.y + 1);
            for (let i = minW; i < maxW; i++) {
                for (let j = minH; j < maxH; j++) {
                    toAddTo.add(squares[i][j]);
                }
            }
        } else if (this.topLeftChild != null) {
            this.topLeftChild.addCellsToUpdate(toAddTo);
            this.bottomLeftChild.addCellsToUpdate(toAddTo);
            this.topRightChild.addCellsToUpdate(toAddTo);
            this.bottomRightChild.addCellsToUpdate(toAddTo);
        }
    };

    this.show = function (r, g, b) {
        stroke(r, g, b);
        let c = color(255, 255, 255, 0);
        fill(c);
        rect(
            this.aabb.topLeft.x * SQUARE_SIDE_SIZE,
            this.aabb.topLeft.y * SQUARE_SIDE_SIZE,
            (this.aabb.bottomRight.x - this.aabb.topLeft.x) * SQUARE_SIDE_SIZE,
            (this.aabb.bottomRight.y - this.aabb.topLeft.y) * SQUARE_SIDE_SIZE
        );
        if (this.topLeftChild) {
            this.topLeftChild.show(r, g, b);
            this.bottomLeftChild.show(r, g, b);
            this.topRightChild.show(r, g, b);
            this.bottomRightChild.show(r, g, b);
        }
        stroke(0, 0, 0);
        c = color(255, 255, 255);
        fill(c);
    };

    this.showContainedCells = function () {
        fill(color(0, 255, 0));
        for (cell of this.cells) {
            square(cell.upperLeftX, cell.upperLeftY, SQUARE_SIDE_SIZE);
        }
        if (this.topLeftChild) {
            this.topLeftChild.showContainedCells();
            this.bottomLeftChild.showContainedCells();
            this.topRightChild.showContainedCells();
            this.bottomRightChild.showContainedCells();
        }
        fill(color(255, 255, 255));
    };
}
