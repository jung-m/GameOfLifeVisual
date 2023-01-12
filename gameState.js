var state = { running: 0, paused: 1 };
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

function resetGame() {
    pauseGame();
    clearField();
}
