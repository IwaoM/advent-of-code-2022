module.exports = function day8 (inputData) {
  const inputArray = inputData.split("\n");
  inputArray.pop(); // remove empty line at EOF

  //* Parsing - matrix initialization
  const treeMatrix = [];
  for (let i = 0; i < inputArray.length; i++) {
    treeMatrix.push([]);
    for (let j = 0; j < inputArray[i].length; j++) {
      // Edge trees are set to visible by default, all the others are set to non-visible
      const isEdge = i === 0 || j === 0 || i === inputArray.length - 1 || j === inputArray[i].length - 1;
      treeMatrix[i].push({
        height: parseInt(inputArray[i][j]),
        visible: isEdge, // part 1 attribute
        scenicScore: 0 // part 2 attribute
      });
    }
  }

  const mHeight = treeMatrix.length;
  const mWidth = treeMatrix[0].length;

  //* Part 1 - Determine visible trees
  // 1. from the left
  for (let i = 1; i < mHeight - 1; i++) {
    let rowMaxSoFar = treeMatrix[i][0].height;
    for (let j = 1; j < mWidth - 1; j++) {
      if (treeMatrix[i][j].height > rowMaxSoFar) {
        treeMatrix[i][j].visible = true;
        rowMaxSoFar = treeMatrix[i][j].height;
      }
      if (rowMaxSoFar === 9) {
        break;
      }
    }
  }

  // 2. from the right
  for (let i = 1; i < mHeight - 1; i++) {
    let rowMaxSoFar = treeMatrix[i][mWidth - 1].height;
    for (let j = mWidth - 2; j > 0; j--) {
      if (treeMatrix[i][j].height > rowMaxSoFar) {
        treeMatrix[i][j].visible = true;
        rowMaxSoFar = treeMatrix[i][j].height;
      }
      if (rowMaxSoFar === 9) {
        break;
      }
    }
  }

  // 3. from the top
  for (let i = 1; i < mWidth - 1; i++) {
    let colMaxSoFar = treeMatrix[0][i].height;
    for (let j = 1; j < mHeight - 1; j++) {
      if (treeMatrix[j][i].height > colMaxSoFar) {
        treeMatrix[j][i].visible = true;
        colMaxSoFar = treeMatrix[j][i].height;
      }
      if (colMaxSoFar === 9) {
        break;
      }
    }
  }

  // 4. from the bottom
  for (let i = 1; i < mWidth - 1; i++) {
    let colMaxSoFar = treeMatrix[mHeight - 1][i].height;
    for (let j = mHeight - 2; j > 0; j--) {
      if (treeMatrix[j][i].height > colMaxSoFar) {
        treeMatrix[j][i].visible = true;
        colMaxSoFar = treeMatrix[j][i].height;
      }
      if (colMaxSoFar === 9) {
        break;
      }
    }
  }

  let result1 = 0;
  for (let i = 0; i < mHeight; i++) {
    for (let j = 0; j < mWidth; j++) {
      if (treeMatrix[i][j].visible) {
        result1++;
      }
    }
  }
  console.log(`Number of visible trees from the exterior: ${result1}`);

  //* Part 2 - determine the best scenic score
  // edge trees are not considered since their score is always 0
  for (let i = 1; i < mHeight - 1; i++) {
    for (let j = 1; j < mWidth - 1; j++) {
      let currentScore = 1;

      // looking right
      for (let k = 1; j + k < mWidth; k++) {
        if (treeMatrix[i][j + k].height >= treeMatrix[i][j].height || j + k === mWidth - 1) {
          currentScore *= k;
          break;
        }
      }

      // looking left
      for (let k = 1; j - k >= 0; k++) {
        if (treeMatrix[i][j - k].height >= treeMatrix[i][j].height || j - k === 0) {
          currentScore *= k;
          break;
        }
      }

      // looking down
      for (let k = 1; i + k < mHeight; k++) {
        if (treeMatrix[i + k][j].height >= treeMatrix[i][j].height || i + k === mHeight - 1) {
          currentScore *= k;
          break;
        }
      }

      // looking up
      for (let k = 1; i - k >= 0; k++) {
        if (treeMatrix[i - k][j].height >= treeMatrix[i][j].height || i - k === 0) {
          currentScore *= k;
          break;
        }
      }

      treeMatrix[i][j].scenicScore = currentScore;
    }
  }

  let result2 = 0;
  for (let i = 0; i < mHeight; i++) {
    for (let j = 0; j < mWidth; j++) {
      if (treeMatrix[i][j].scenicScore > result2) {
        result2 = treeMatrix[i][j].scenicScore;
      }
    }
  }
  console.log(`Highest scenic score in the forest: ${result2}`);
};