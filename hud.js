let overlay;
let startButton;
let pauseButton;
let clearButton;
let fillRandomButton;
let gliderDrawButton;
let heavyGliderDrawButton;
let buttons = [];

function initHud() {
    overlay = createElement("overlay");
    overlay.class("overlay");

    startButton = createButton("Start");
    startButton.class("baseButton defaultButton");
    startButton.parent(overlay);
    startButton.mousePressed(resumeGame);
    buttons.push(startButton);

    pauseButton = createButton("Pause");
    pauseButton.class("baseButton defaultButton");
    pauseButton.parent(overlay);
    pauseButton.mousePressed(pauseGame);
    buttons.push(pauseButton);
    pauseButton.hide();

    clearButton = createButton("Clear");
    clearButton.class("baseButton defaultButton");
    clearButton.parent(overlay);
    clearButton.mousePressed(resetGame);
    buttons.push(clearButton);

    // fillRandomButton = createButton("Fill Field");
    // fillRandomButton.class("baseButton defaultButton");
    // fillRandomButton.parent(overlay);
    // fillRandomButton.mousePressed(initializeRandom);
    // buttons.push(fillRandomButton);

    gliderDrawButton = createButton("Glider");
    gliderDrawButton.class("baseButton defaultButton");
    gliderDrawButton.parent(overlay);
    gliderDrawButton.mousePressed(toggleGliderDraw);
    buttons.push(gliderDrawButton);

    heavyGliderDrawButton = createButton("Heavy Glider");
    heavyGliderDrawButton.class("baseButton defaultButton");
    heavyGliderDrawButton.parent(overlay);
    heavyGliderDrawButton.mousePressed(toggleHeavyGliderDraw);
    buttons.push(heavyGliderDrawButton);
}

function activateButton(button) {
    button.addClass("activatedButton");
    button.removeClass("defaultButton");
}

function deactivateButton(button) {
    button.addClass("defaultButton");
    button.removeClass("activatedButton");
}

function hudOnPause() {
    pauseButton.hide()
    startButton.show()
}

function hudOnRunning() {
    startButton.hide()
    pauseButton.show()
}
