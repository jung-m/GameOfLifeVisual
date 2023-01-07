var specialFormations = [];
var shapesToDraw = { CELL: 0, GLIDER: 1, HEAVY_GLIDER: 2 };
var toggleDrawFunctions = {
    0: () => {},
    1: toggleGliderDraw,
    2: toggleHeavyGliderDraw,
};

var shapeCurrentlyDrawn = shapesToDraw.CELL;
var currentlyDrawing = true;

function toggleGliderDraw() {
    if (shapeCurrentlyDrawn !== shapesToDraw.GLIDER) {
        toggleDrawFunctions[shapeCurrentlyDrawn]();
        shapeCurrentlyDrawn = shapesToDraw.GLIDER;

        activateButton(gliderDrawButton);
    } else {
        shapeCurrentlyDrawn = shapesToDraw.CELL;

        deactivateButton(gliderDrawButton);
    }
}

function toggleHeavyGliderDraw() {
    if (shapeCurrentlyDrawn !== shapesToDraw.HEAVY_GLIDER) {
        toggleDrawFunctions[shapeCurrentlyDrawn]();
        shapeCurrentlyDrawn = shapesToDraw.HEAVY_GLIDER;

        activateButton(heavyGliderDrawButton);
    } else {
        shapeCurrentlyDrawn = shapesToDraw.CELL;

        deactivateButton(heavyGliderDrawButton);
    }
}

function toggleDraw() {
    currentlyDrawing = !currentlyDrawing;
}
