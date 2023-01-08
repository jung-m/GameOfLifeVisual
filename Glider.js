function Glider(x, y, squaresArray) {
  this.leftX = x;
  this.leftY = y;

  this.cells = [];

  let k;
  for (k = x; k <= x + 2; k++) {
    this.cells.push(squaresArray[k][y]);
  }
  this.cells.push(squaresArray[k - 1][y - 1]);
  this.cells.push(squaresArray[k - 2][y - 2]);

  this.display = function () {
    this.cells.forEach((e) => {
      e.setAlive();
    });
  };

  this.clicked = function () {};

  this.setAlive = function () {
    this.cells.forEach((e) => {
      e.setAlive();
    });
  };

  this.kill = function () {
    this.cells.forEach((e) => {
      e.kill();
    });
  };
}
