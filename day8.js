module.exports = function day8 (inputData) {
  const inputArray = inputData.split("\n");
  inputArray.pop(); // remove empty line at EOF

  //* Parsing
  // 1. Construct matrix
  const treeMatrix = [];
  for (let i = 0; i < inputArray.length; i++) {
    treeMatrix.push([]);
    for (let j = 0; j < inputArray[i].length; j++) {
      // Edge trees are set to visible by default, all the others are set to non-visible
      const isEdge = i === 0 || j === 0 || i === inputArray.length - 1 || j === inputArray[i].length - 1;
      treeMatrix[i].push({ height: parseInt(inputArray[i][j]), visible: isEdge });
    }
  }

  // 2. Determine visible trees
  const mHeight = treeMatrix.length;
  const mWidth = treeMatrix[0].length;

  // 2.1. from the left
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

  // 2.2. from the right
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

  // 2.3. from the top
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

  // 2.4. from the bottom
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

  //* Part 1
  let result1 = 0;
  for (let i = 0; i < mHeight; i++) {
    for (let j = 0; j < mWidth; j++) {
      if (treeMatrix[i][j].visible) {
        result1++;
      }
    }
  }
  console.log(`Number of visible trees from the exterior: ${result1}`);

  //* Part 2
  let result2;
  console.log(`result2: ${result2}`);
};