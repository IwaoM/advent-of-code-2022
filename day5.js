module.exports = function day5 (inputData) {
  const inputArray = inputData.split("\n");

  //* Parsing

  // Step 1 - separating the drawing from the instructions
  const drawingRows = [];
  const instructionRows = [];
  let stackCount;
  let drawingFinished = false;
  for (let i = 0; i < inputArray.length; i++) {
    if (!drawingFinished) {
      if (inputArray[i]) {
        drawingRows.push(inputArray[i]);
      } else {
        stackCount = parseInt(inputArray[i - 1][inputArray[i - 1].length - 2]);
        drawingRows.pop();
        drawingFinished = true;
      }
    } else {
      instructionRows.push(inputArray[i]);
    }
  }

  // Step 2 - constructing the stacks
  const startingStacks = [];
  for (let i = 0; i < stackCount; i++) {
    startingStacks.push([]);
  }
  for (let i = drawingRows.length - 1; i >= 0; i--) { // start from the bottom (shift & unshift are more expensive operations than push & pop)
    for (let j = 0; j < stackCount; j++) {
      if (drawingRows[i][j * 4 + 1] != " ") {
        startingStacks[j].push(drawingRows[i][j * 4 + 1]);
      }
    }
  }

  // Step 3 - constructing instructions
  const instructionArray = [];
  for (let i = 0; i < instructionRows.length; i++) {
    const instruction = [
      parseInt(instructionRows[i].split(" ")[1]),
      parseInt(instructionRows[i].split(" ")[3]),
      parseInt(instructionRows[i].split(" ")[5])
    ];
    instructionArray.push(instruction);
  }

  //* Part 1
  let result1 = "";
  const stacks1 = JSON.parse(JSON.stringify(startingStacks)); // deep copy
  for (let i = 0; i < instructionArray.length; i++) {
    for (let j = 0; j < instructionArray[i][0]; j++) {
      const crate = stacks1[instructionArray[i][1] - 1].pop();
      stacks1[instructionArray[i][2] - 1].push(crate);
    }
  }
  for (let i = 0; i < stackCount; i++) {
    result1 += stacks1[i][stacks1[i].length - 1];
  }
  console.log(`Letters of the highest crate in each stack with the CrateMover 9000: ${result1}`);

  //* Part 2
  let result2 = "";
  const stacks2 = JSON.parse(JSON.stringify(startingStacks)); // deep copy
  for (let i = 0; i < instructionArray.length; i++) {
    const subStack = [];
    for (let j = 0; j < instructionArray[i][0]; j++) {
      const crate = stacks2[instructionArray[i][1] - 1].pop();
      subStack.push(crate);
    }
    subStack.reverse();
    stacks2[instructionArray[i][2] - 1].push(...subStack);
  }
  for (let i = 0; i < stackCount; i++) {
    result2 += stacks2[i][stacks2[i].length - 1];
  }
  console.log(`Letters of the highest crate in each stack with the CrateMover 9001: ${result2}`);
};