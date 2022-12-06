module.exports = function day3 (inputData) {
  const inputArray = inputData.split("\n");
  inputArray.pop(); // remove empty line at EOF
  const priorities = "-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Part 1
  let result1 = 0;
  // console.log(`result1 = ${result1}\n`);
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i]) {
      // Splitting into 2 compartments
      const capacity = inputArray[i].length / 2;
      const compartment1 = inputArray[i].slice(0, capacity), compartment2 = inputArray[i].slice(capacity);
      // console.log(`${compartment1} + ${compartment2}`);

      // For each character of the 1st compartment, check if it is found in the 2nd
      let foundInC2;
      for (let j = 0; j < compartment1.length; j++) {
        foundInC2 = compartment2.indexOf(compartment1[j]);
        if (foundInC2 + 1) {
          // if it is found : get its priority value and add it to the result
          // console.log(`Character found : ${compartment1[j]} - adding ${priorities.indexOf(compartment1[j])} to result1`);
          result1 += priorities.indexOf(compartment1[j]);
          // console.log(`result1 = ${result1}\n`);
          break;
        }
      }
    }
  }
  console.log(`Sum of the priorities of misplaced item types: ${result1}`);

  // Part 2
  let result2 = 0;
  // console.log(`result2 = ${result2}\n`);
  const groupArray = [];
  // construct the groups of 3
  for (let i = 0; i < inputArray.length; i++) {
    if (i % 3 == 0) {
      groupArray.push([]);
    }
    groupArray[groupArray.length - 1].push(inputArray[i]);
  }
  for (let i = 0; i < groupArray.length; i++) {
    // console.log(groupArray[i]);
    for (let j = 0; j < groupArray[i][0].length; j++) {
      const currentLetter = groupArray[i][0][j];
      if (groupArray[i][1].indexOf(currentLetter) >= 0 && groupArray[i][2].indexOf(currentLetter) >= 0) {
        // console.log(`Character found : ${currentLetter} - adding ${priorities.indexOf(currentLetter)} to result2`);
        result2 += priorities.indexOf(currentLetter);
        // console.log(`result2 = ${result2}\n`);
        break;
      }
    }
  }
  console.log(`Sum of the priorities of badges: ${result2}`);
};