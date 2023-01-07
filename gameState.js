var state = { running: 0, paused: 1 };
var gameState;

function resumeGame() {
    gameState = state.running;
}

function pauseGame() {
    gameState = state.paused;
}

function resetGame() {
    gameState = state.paused;
    clearField();
}
