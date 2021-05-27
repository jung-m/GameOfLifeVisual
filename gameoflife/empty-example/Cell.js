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
    this.setAlive();
  };

  this.setAlive = function () {
    this.isAlive = true;
    this.col = color(255, 255, 255);
    fill(this.col);
    square(this.upperLeftX, this.upperLeftY, sizeOfSide);
  };

  this.kill = function () {
    this.isAlive = false;
    this.col = color(0, 0, 0);
    fill(this.col);
    square(this.upperLeftX, this.upperLeftY, sizeOfSide);
  };
}
