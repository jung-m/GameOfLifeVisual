var state = { running: 0, paused: 1 };
var gameState = state.paused;

function resumeGame() {
    gameState = state.running;
}

function pauseGame() {
    gameState = state.paused;
}

function resetGame() {
    gameState = state.paused;
    aliveWindowIndex = 0;
    clearField();
}
