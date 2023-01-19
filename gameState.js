var state = { running: 0, paused: 1, inMenu: 2 };
var gameState = state.paused;

function resumeGame() {
    gameState = state.running;
    setFrameRate(10);
    hudOnRunning();
}

function pauseGame() {
    gameState = state.paused;
    setFrameRate(30);
    hudOnPause();
}

function gameToggleMenu() {
    if (gameState != state.inMenu) {
        gameState = state.inMenu;
        displayMenu();
    } else {
        gameState = state.paused;
        hideMenu();
    }
}

function resetGame() {
    pauseGame();
    clearField();
}
