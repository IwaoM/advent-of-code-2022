module.exports = function day3 (inputData) {
  const inputArray = inputData.split("\n");
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
  console.log(`Total number of calories carried by the 3 elves carrying the most calories: ${result2}`);
};