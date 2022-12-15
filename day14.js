const fs = require("node:fs");
const path = require("node:path");

class SandUnit {

  static cave;

  constructor () {
    this.x = 500;
    this.y = 0;
    this.canFall = true;
  }

  fall () {
    while (this.canFall && this.y < SandUnit.cave.length - 1) {
      if (SandUnit.cave[this.y + 1][this.x] === ".") { // check directly down
        SandUnit.cave[this.y + 1][this.x] = "o";
        SandUnit.cave[this.y][this.x] = ".";
        this.y++;
      } else if (SandUnit.cave[this.y + 1][this.x - 1] === ".") { // check bottom left
        SandUnit.cave[this.y + 1][this.x - 1] = "o";
        SandUnit.cave[this.y][this.x] = ".";
        this.y++;
        this.x--;
      } else if (SandUnit.cave[this.y + 1][this.x + 1] === ".") {// check bottom right
        SandUnit.cave[this.y + 1][this.x + 1] = "o";
        SandUnit.cave[this.y][this.x] = ".";
        this.y++;
        this.x++;
      } else { // settle, for this sand unit cannot fall further
        this.canFall = false;
      }
    }
    return this.canFall; // true if still falling
  }
}

module.exports = function day14 (inputData) {
  //* Parsing
  const inputArray = inputData.split("\n");
  inputArray.pop(); // remove empty line at EOF

  // 1. parse the input into an array of arrays of coordinate pairs
  const rockNodesArray = inputArray.map(elem => {
    return elem.split(" -> ").map(coords => {
      return {
        x: parseInt(coords.split(",")[0]),
        y: parseInt(coords.split(",")[1])
      };
    });
  });

  // 2. get the highest Y coordinate (lowest point) for a rock structure node
  let yMax = 0;
  for (let i = 0; i < rockNodesArray.length; i++) {
    for (let j = 0; j < rockNodesArray[i].length; j++) {
      if (rockNodesArray[i][j].y > yMax) {
        yMax = rockNodesArray[i][j].y;
      }
    }
  }
  yMax++;
  const xMax = 500 + yMax;

  // 3. draw the cave
  // 3.1. fill empty space
  const cave = [];
  for (let i = 0; i < yMax; i++) {
    cave.push([]);
    for (let j = 0; j < xMax; j++) {
      cave[i].push(".");
    }
  }

  // 3.2. draw rock structures
  for (let i = 0; i < rockNodesArray.length; i++) {
    // each pair of coordinates forms a segment
    for (let j = 0; j < rockNodesArray[i].length - 1; j++) {
      const startNode = rockNodesArray[i][j], endNode = rockNodesArray[i][j + 1];
      const xDiff = endNode.x - startNode.x;
      const yDiff = endNode.y - startNode.y;
      if (xDiff > 0) { // go right from start
        for (let k = startNode.x; k <= endNode.x; k++) {
          cave[startNode.y][k] = "#";
        }
      } else if (xDiff < 0) { // go left from start
        for (let k = startNode.x; k >= endNode.x; k--) {
          cave[startNode.y][k] = "#";
        }
      } else if (yDiff > 0) { // go down from start
        for (let k = startNode.y; k <= endNode.y; k++) {
          cave[k][startNode.x] = "#";
        }
      } else { // go up from start
        for (let k = startNode.y; k >= endNode.y; k--) {
          cave[k][startNode.x] = "#";
        }
      }
    }
  }

  // visual representation in a file because rows are too long for the console
  const outputFolder = path.join(__dirname, "outputs");
  const outputDir0 = path.join(outputFolder, "14-0.txt");
  fs.writeFileSync(outputDir0, cave.map(row => row.join("")).join("\n"));

  //* Part 1
  console.log(`== PART 1 ==`);

  const outputDir1 = path.join(outputFolder, "14-1.txt");

  SandUnit.cave = JSON.parse(JSON.stringify(cave));
  let fallInAbyss = false, result1 = 0;
  while (!fallInAbyss) {
    const sandUnit = new SandUnit();
    fallInAbyss = sandUnit.fall();
    if (!fallInAbyss) {
      result1++;
    }
    fs.writeFileSync(outputDir1, SandUnit.cave.map(row => row.join("")).join("\n"));
  }
  console.log(`Number of sand units that come to a rest before sand starts flowing into the abyss: ${result1}\n`);

  //* Part 2
  console.log(`== PART 2 ==`);
  const result2 = 0;
  console.log(`Result2: ${result2}`);
};