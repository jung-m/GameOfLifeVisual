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
            this.bottomRight.x >= cell.coord.x &&
            this.bottomRight.y >= cell.coord.y
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
    };

    this.insert = function (cell) {
        if (!this.aabb.contains(cell)) {
            return;
        }

        if (
            Math.abs(this.aabb.topLeft.x - this.aabb.bottomRight.x) <=
                SMALLEST_RECT_SIDE ||
            Math.abs(this.aabb.topLeft.y - this.aabb.bottomRight.y) <=
                SMALLEST_RECT_SIDE
        ) {
            this.cells.push(cell);
            return;
        }
        if (this.topLeftChild === null) {
            this.createChildren();
        }
        this.topLeftChild.insert(cell);
        this.bottomLeftChild.insert(cell);
        this.topRightChild.insert(cell);
        this.bottomRightChild.insert(cell);
    };

    // this.show = function () {
    //     stroke(255, 255, 255);
    //     let c = color(255, 255, 255, 0);
    //     fill(c);
    //     rect(
    //         this.aabb.topLeft.x * SQUARE_SIDE_SIZE,
    //         this.aabb.topLeft.y * SQUARE_SIDE_SIZE,
    //         (this.aabb.bottomRight.x - this.aabb.topLeft.x) * SQUARE_SIDE_SIZE,
    //         (this.aabb.bottomRight.y - this.aabb.topLeft.y) * SQUARE_SIDE_SIZE
    //     );
    //     if (this.topLeftChild) {
    //         this.topLeftChild.show();
    //         this.bottomLeftChild.show();
    //         this.topRightChild.show();
    //         this.bottomRightChild.show();
    //     }
    // };
}
