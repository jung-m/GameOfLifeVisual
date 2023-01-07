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

        gliderDrawButton.addClass("activatedButton");
        gliderDrawButton.removeClass("defaultButton");

        gliderDrawButton.mouseOver(() => {
            currentlyDrawing = false;
        });
        gliderDrawButton.mouseOut(() => {
            currentlyDrawing = true;
        });
    } else {
        shapeCurrentlyDrawn = shapesToDraw.CELL;

        gliderDrawButton.removeClass("activatedButton");
        gliderDrawButton.addClass("defaultButton");

        gliderDrawButton.mouseOver(() => {
            currentlyDrawing = false;
        });
        gliderDrawButton.mouseOut(() => {
            currentlyDrawing = true;
        });
    }
}

function toggleHeavyGliderDraw() {
    if (shapeCurrentlyDrawn !== shapesToDraw.HEAVY_GLIDER) {
        toggleDrawFunctions[shapeCurrentlyDrawn]();
        shapeCurrentlyDrawn = shapesToDraw.HEAVY_GLIDER;

        heavyGliderDrawButton.addClass("activatedButton");
        heavyGliderDrawButton.removeClass("defaultButton");

        heavyGliderDrawButton.mouseOver(() => {
            currentlyDrawing = false;
        });
        heavyGliderDrawButton.mouseOut(() => {
            currentlyDrawing = true;
        });
    } else {
        shapeCurrentlyDrawn = shapesToDraw.CELL;

        heavyGliderDrawButton.removeClass("activatedButton");
        heavyGliderDrawButton.addClass("defaultButton");

        heavyGliderDrawButton.mouseOver(() => {
            currentlyDrawing = false;
        });
        heavyGliderDrawButton.mouseOut(() => {
            currentlyDrawing = true;
        });
    }
}
