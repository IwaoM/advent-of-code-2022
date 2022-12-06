module.exports = function day2 (inputData) {
  const inputArray = inputData.split("\n");
  inputArray.pop(); // remove empty line at EOF

  // Part 1
  const letterList1 = ["A", "B", "C"];
  const letterList2 = ["X", "Y", "Z"];
  let result1 = 0;

  for (let i = 0; i < inputArray.length; i++) {
    if (!inputArray[i]) {
      break;
    }

    // points for the shape : rock == 1, paper == 2, scissors == 3
    const shape1 = letterList1.indexOf(inputArray[i].split(" ")[0]) + 1;// rock == 1, paper == 2, scissors == 3
    const shape2 = letterList2.indexOf(inputArray[i].split(" ")[1]) + 1;
    let roundPoints = shape2;

    // points for the outcome
    if (shape1 == shape2) {
      roundPoints += 3;
    } else if (shape2 - shape1 % 3 == 1) { // 2 beats 1, 3 beats 2, 1 beats 3
      roundPoints += 6;
    }
    result1 += roundPoints;
  }
  console.log(`Total number of points for part 1: ${result1}`);

  // Part 2
  let result2 = 0;
  for (let i = 0; i < inputArray.length; i++) {
    if (!inputArray[i]) {
      break;
    }

    const outcomePoints = letterList2.indexOf(inputArray[i].split(" ")[1]) * 3;
    const shapePoints = (letterList1.indexOf(inputArray[i].split(" ")[0]) + letterList2.indexOf(inputArray[i].split(" ")[1]) + 2) % 3 + 1;
    result2 += outcomePoints + shapePoints;
  }
  console.log(`Total number of points for part 2: ${result2}`);
};