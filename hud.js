let overlay;
let startButton;
let pauseButton;
let clearButton;
let gliderDrawButton;
let heavyGliderDrawButton;
let buttons = [];

function initHud() {
    overlay = createElement("overlay");
    overlay.class("overlay");

    startButton = createButton("");
    startButton.class("baseButton defaultButton quadraticButton");
    startButton.parent(overlay);
    startButton.mousePressed(resumeGame);
    buttons.push(startButton);

    playIcon = createImg("./images/buttons/play.png", "");
    playIcon.class("buttonIcon");
    playIcon.parent(startButton);

    pauseButton = createButton("");
    pauseButton.class("baseButton defaultButton quadraticButton");
    pauseButton.parent(overlay);
    pauseButton.mousePressed(pauseGame);
    buttons.push(pauseButton);
    pauseButton.hide();

    pauseIcon = createImg("./images/buttons/pause.png", "");
    pauseIcon.class("buttonIcon");
    pauseIcon.parent(pauseButton);

    clearButton = createButton("");
    clearButton.class("baseButton defaultButton quadraticButton");
    clearButton.parent(overlay);
    clearButton.mousePressed(resetGame);
    buttons.push(clearButton);

    clearIcon = createImg("./images/buttons/clear.png", "");
    clearIcon.class("buttonIcon");
    clearIcon.parent(clearButton);

    gliderDrawButton = createButton("");
    gliderDrawButton.class("baseButton defaultButton quadraticButton");
    gliderDrawButton.parent(overlay);
    gliderDrawButton.mousePressed(toggleGliderDraw);
    buttons.push(gliderDrawButton);

    gliderIcon = createImg("./images/buttons/glider.png", "");
    gliderIcon.class("buttonIcon");
    gliderIcon.parent(gliderDrawButton);

    heavyGliderDrawButton = createButton("");
    heavyGliderDrawButton.class("baseButton defaultButton stretchButton");
    heavyGliderDrawButton.parent(overlay);
    heavyGliderDrawButton.mousePressed(toggleHeavyGliderDraw);
    buttons.push(heavyGliderDrawButton);

    heavyGliderIcon = createImg("./images/buttons/heavyGlider.png", "");
    heavyGliderIcon.class("buttonIcon");
    heavyGliderIcon.parent(heavyGliderDrawButton);
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
    pauseButton.hide();
    startButton.show();
}

function hudOnRunning() {
    startButton.hide();
    pauseButton.show();
}
