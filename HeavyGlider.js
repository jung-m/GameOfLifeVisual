function HeavyGlider(x, y, squaresArray) {

    this.topLeftX = x;
    this.topLeftY = y;
  
    this.cells = [];
  
    let k;
    for (k = this.topLeftX; k <= this.topLeftX + 5; k++) {
      this.cells.push(squaresArray[k][this.topLeftY]);
    }
    k--
    this.cells.push(squaresArray[k][this.topLeftY + 1]);
    this.cells.push(squaresArray[k][this.topLeftY + 2]);
    this.cells.push(squaresArray[k - 1][this.topLeftY + 3]);
    this.cells.push(squaresArray[k - 3][this.topLeftY + 4]);
    this.cells.push(squaresArray[k - 4][this.topLeftY + 4]);
    this.cells.push(squaresArray[k - 6][this.topLeftY + 3]);
    this.cells.push(squaresArray[k - 6][this.topLeftY + 1]);
  
    this.display = function () {
      this.cells.forEach((e) => {
        e.setAlive();
        e.display();
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
  