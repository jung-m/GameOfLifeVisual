let overlay;
let startButton;
let pauseButton;
let clearButton;
let gliderDrawButton;
let heavyGliderDrawButton;
let buttons = [];

let inMenu = false;

function initHud() {
    overlay = createElement("overlay");
    overlay.class("overlay");

    startButton = createButton("");
    startButton.addClass("baseButton defaultButton quadraticButton");
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

    menuButton = createButton("");
    menuButton.class("baseButton defaultButton menuButton");
    menuButton.parent(overlay);
    menuButton.mousePressed(toggleMenu);
    buttons.push(menuButton);

    menuIcon = createImg("./images/buttons/settings.png", "");
    menuIcon.class("buttonIcon");
    menuIcon.parent(menuButton);

    // Menu
    menu = createDiv("");
    menu.class("menu");
    menu.hide();

    menuTopRow = createDiv("");
    menuTopRow.class("menuTopRow");
    menuTopRow.parent(menu);

    crossCont = createDiv("");
    crossCont.class("crossButtonContainer");
    crossCont.parent(menu);

    menuHeading = createSpan("Menu");
    menuHeading.class("text heading noWrapText");
    menuHeading.parent(menuTopRow);

    crossButton = createButton("");
    crossButton.class("baseButton defaultButton quadraticButton");
    crossButton.parent(crossCont);
    crossButton.mousePressed(toggleMenu);
    buttons.push(crossButton);

    crossIcon = createImg("./images/buttons/cross.png", "");
    crossIcon.class("buttonIcon");
    crossIcon.parent(crossButton);

    menuHeading = createSpan("Choose structure to draw:");
    menuHeading.class("text message noWrapText");
    menuHeading.parent(menu);
}

function activateButton(button) {
    button.removeClass("defaultButton");
    button.addClass("activatedButton");
}

function deactivateButton(button) {
    button.removeClass("activatedButton");
    button.addClass("defaultButton");
}

function hudOnPause() {
    pauseButton.hide();
    gliderDrawButton.style("display", "flex");
    heavyGliderDrawButton.style("display", "flex");
    startButton.style("display", "flex");
    menuButton.style("display", "flex");
    hideMenu();
}

function hudOnRunning() {
    startButton.hide();
    gliderDrawButton.hide();
    heavyGliderDrawButton.hide();
    pauseButton.style("display", "flex");
    menuButton.hide();
    hideMenu();
}

function displayMenu() {
    menu.style("display", "flex");
    inMenu = true;
}

function hideMenu() {
    menu.hide();
    inMenu = false;
}

function toggleMenu() {
    gameToggleMenu();
}
