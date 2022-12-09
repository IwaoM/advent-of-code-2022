class Knot {
  constructor (x = 0, y = 0) {
    this.posX = x;
    this.posY = y;
    this.recordedPositions = new Set();
    this.recordedPositions.add(`${x} ${y}`);
  }

  recordPosition () {
    this.recordedPositions.add(`${this.posX} ${this.posY}`);
  }

  moveKnot (direction) {
    // One step at a time
    if (direction === "U") {
      this.posY++;
    } else if (direction === "D") {
      this.posY--;
    } else if (direction === "R") {
      this.posX++;
    } else if (direction === "L") {
      this.posX--;
    }
  }

  followKnot (leadKnot) {
    // Part 1: leadKnot cannot be too far away (the Manhattan distance between leadKnot & this cannot exceed 3)
    // Part 2: since a followed knot can now move away diagonally, max Manhattan distance becomes 4
    if (
      Math.abs(leadKnot.posX - this.posX) + Math.abs(leadKnot.posY - this.posY) === 3 ||
      Math.abs(leadKnot.posX - this.posX) + Math.abs(leadKnot.posY - this.posY) === 4
    ) {
      // leadKnot and this are not touching, and they are in different rows & columns: get closer diagonally
      this.posX > leadKnot.posX ? this.moveKnot("L") : this.moveKnot("R");
      this.posY > leadKnot.posY ? this.moveKnot("D") : this.moveKnot("U");
    } else if (Math.abs(leadKnot.posX - this.posX) === 2) {
      // same row, different columns: get closer horizontally
      this.posX > leadKnot.posX ? this.moveKnot("L") : this.moveKnot("R");
    } else if (Math.abs(leadKnot.posY - this.posY) === 2) {
      // same column, different rows: get closer vertically
      this.posY > leadKnot.posY ? this.moveKnot("D") : this.moveKnot("U");
    }
    // else: knots are contiguous, so do nothing
  }
}

module.exports = function day9 (inputData) {
  const inputArray = inputData.split("\n");
  inputArray.pop(); // remove empty line at EOF

  //* Parsing
  const instructionArray = [];
  for (let i = 0; i < inputArray.length; i++) {
    const times = parseInt(inputArray[i].split(" ")[1]);
    const direction = inputArray[i].split(" ")[0];
    for (let j = 0; j < times; j++) {
      instructionArray.push(direction);
    }
  }

  //* Part 1
  const headKnot = new Knot();
  const tailKnot = new Knot();
  // console.log(`Initial state: hx = ${headKnot.posX}, hy = ${headKnot.posY}, tx = ${tailKnot.posX}, ty = ${tailKnot.posY}, recorded positions = ${tailKnot.recordedPositions.size}`);
  for (let i = 0; i < instructionArray.length; i++) {
    headKnot.moveKnot(instructionArray[i]);
    tailKnot.followKnot(headKnot);
    tailKnot.recordPosition();
    // console.log(`Instruction: ${instructionArray[i]} - state: hx = ${headKnot.posX}, hy = ${headKnot.posY}, tx = ${tailKnot.posX}, ty = ${tailKnot.posY}, recorded positions = ${tailKnot.recordedPositions.size}`);
  }
  const result1 = tailKnot.recordedPositions.size;
  console.log(`Number of different positions the tail knot has had: ${result1}`);

  //* Part 2
  const rope = [];
  for (let i = 0; i < 10; i++) {
    rope.push(new Knot());
  }
  for (let i = 0; i < instructionArray.length; i++) {
    rope[0].moveKnot(instructionArray[i]);
    for (let j = 1; j < 10; j++) {
      rope[j].followKnot(rope[j - 1]);
    }
    rope[9].recordPosition();
  }
  const result2 = rope[9].recordedPositions.size;
  console.log(`Number of different positions the last knot of the long rope has had: ${result2}`);

};