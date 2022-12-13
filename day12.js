class Position {
  static allPositions = [];

  constructor (xCoord, yCoord, height) {
    this.x = xCoord;
    this.y = yCoord;
    if (height === "S") {
      this.isStart = true;
      this.height = 0; // a
      this.gScore = 0;
    } else if (height === "E") {
      this.isEnd = true;
      this.height = 25; // z
    } else {
      this.height = height.charCodeAt(0) - 97; // ascii code for "a" is 97
    }
    Position.allPositions.push(this);
  }

  getNeighbors () {
    const neighbors = [];

    let n = Position.allPositions.find(pos => pos.x === this.x && pos.y === this.y + 1);
    if (n) {
      neighbors.push(n);
    }
    n = Position.allPositions.find(pos => pos.x === this.x && pos.y === this.y - 1);
    if (n) {
      neighbors.push(n);
    }
    n = Position.allPositions.find(pos => pos.x === this.x + 1 && pos.y === this.y);
    if (n) {
      neighbors.push(n);
    }
    n = Position.allPositions.find(pos => pos.x === this.x - 1 && pos.y === this.y);
    if (n) {
      neighbors.push(n);
    }

    return neighbors;
  }

  stepCost (previousPos) {
    return this.height - previousPos.height > 1 ? Infinity : previousPos.height - this.height + 2;
  }

  updateGScore (previousPos) {
    // g function : movement cost from the start to the current position
    // follow the path generated so far
    // step cost is 1 if previous position is 1 level below (optimal case), 2 if same level, 3 if 1 level above, etc.
    // if previous position is more than 1 level below, movement is impossible so cost is Infinity
    const newGScore = previousPos.gScore + this.stepCost(previousPos);
    if (!this.gScore || newGScore < this.gScore) {
      this.gScore = newGScore;
      return true; // if updated
    }
    return false;
  }

  updateFScoreToEnd (endPosition) {
    // h function : estimated movement cost from the current position to the destination
    // Manhattan distance is used here - ignore elevations
    this.fScore = this.gScore + Math.abs(endPosition.x - this.x) + Math.abs(endPosition.y - this.y);
    return this.fScore;
  }

  getPathToCurrent (previousPosMap) {
    let current = this;
    const fullPath = [current];
    while (previousPosMap.has(current) && !current.isStart) {
      current = previousPosMap.get(current);
      fullPath.unshift(current);
    }
    return (fullPath);
  }
}

module.exports = function day10 (inputData) {
  const inputArray = inputData.split("\n");
  inputArray.pop(); // remove empty line at EOF

  //* Part 1
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[i].length; j++) {
      new Position(j, i, inputArray[i][j]);
    }
  }

  const startPos = Position.allPositions.find(elem => elem.isStart);
  const endPos = Position.allPositions.find(elem => elem.isEnd);
  startPos.updateFScoreToEnd(endPos);

  const openSet = new Set();
  openSet.add(startPos);
  const previousPositions = new Map();
  let fullPath;

  while (openSet.size) {
    // store fScores & get the lowest
    let currentPos;
    openSet.forEach(elem => {
      if (!currentPos || currentPos.fScore > elem.fScore) {
        currentPos = elem;
      }
    });
    if (currentPos.isEnd) {
      fullPath = currentPos.getPathToCurrent(previousPositions);
      break;
    } else {
      openSet.delete(currentPos);
      for (let neighbor of currentPos.getNeighbors()) {
        if (neighbor.updateGScore(currentPos)) {
          previousPositions.set(neighbor, currentPos);
          neighbor.updateFScoreToEnd(endPos);
          openSet.add(neighbor);
        }
      }
    }
  }

  const result1 = fullPath.length - 1;
  console.log(`The minimum number of steps needed to go from S to E is: ${result1}`);
};