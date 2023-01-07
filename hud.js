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

    clearButton = createButton("Clear");
    clearButton.class("baseButton defaultButton");
    clearButton.parent(overlay);
    clearButton.mousePressed(resetGame);
    buttons.push(clearButton);

    fillRandomButton = createButton("Fill the field randomly");
    fillRandomButton.class("baseButton defaultButton");
    fillRandomButton.parent(overlay);
    fillRandomButton.mousePressed(initializeRandom);
    buttons.push(fillRandomButton);

    gliderDrawButton = createButton("Toggle glider draw");
    gliderDrawButton.class("baseButton defaultButton");
    gliderDrawButton.parent(overlay);
    gliderDrawButton.mousePressed(toggleGliderDraw);
    buttons.push(gliderDrawButton);

    heavyGliderDrawButton = createButton("Toggle heavy glider draw");
    heavyGliderDrawButton.class("baseButton defaultButton");
    heavyGliderDrawButton.parent(overlay);
    heavyGliderDrawButton.mousePressed(toggleHeavyGliderDraw);
    buttons.push(heavyGliderDrawButton);
}