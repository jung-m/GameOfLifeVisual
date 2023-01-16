let quadTree;

function initTree() {
    quadTree = new QuadTree(
        new CellCoordinate(0, 0),
        new CellCoordinate(squares.length, squares[0].length)
    );
}

function cellsToUpdate() {
    toUpdate = new Set();
    quadTree.addCellsToUpdate(toUpdate);
    return toUpdate;
}
