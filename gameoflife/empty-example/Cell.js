function Cell(x, y, sizeOfSide) {
  this.upperLeftX = x;
  this.upperLeftY = y;
  this.col = color(0, 0, 0);
  this.isAlive = false;

  this.display = function () {
    fill(this.col);
    square(this.upperLeftX, this.upperLeftY, sizeOfSide);
  };

  this.clicked = function () {
    this.col = color(255, 255, 255);
    this.setAlive();
  };

  this.setAlive = function () {
    this.isAlive = true;
  };

  this.kill = function () {
    this.isAlive = false;
  };
}
