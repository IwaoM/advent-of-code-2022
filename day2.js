module.exports = function day2 (inputData) {
  const inputArray = inputData.split("\n");

  // Part 1
  const letterList1 = ["A", "B", "C"];
  const letterList2 = ["X", "Y", "Z"];
  let result1 = 0;

  for (let i = 0; i < inputArray.length; i++) {
    // points for the shape : rock == 1, paper == 2, scissors == 3
    const shape1 = letterList1.indexOf(inputArray[i].split(" ")[0]) + 1;// rock == 1, paper == 2, scissors == 3
    const shape2 = letterList2.indexOf(inputArray[i].split(" ")[1]) + 1;
    let roundPoints = shape2;

    // points for the outcome
    if (shape1 && shape2 && shape1 == shape2) {
      roundPoints += 3;
    } else if (shape2 - shape1 % 3 == 1) {
      roundPoints += 6;
    }
    result1 += roundPoints;
  }
  console.log(`Total number of points: ${result1}`);
};