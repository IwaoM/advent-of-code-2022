module.exports = function day1 (inputData) {

  const inputArray = inputData.split("\n");

  // Part 1
  const resultArray = [0];

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i]) {
      resultArray[resultArray.length - 1] += Number(inputArray[i]);
    } else {
      resultArray.push(0);
    }
  }

  const result1 = Math.max(...resultArray);
  console.log(`Number of calories carried by the elf carrying the most calories: ${result1}`);

  // Part 2
  resultArray.sort((a, b) => b - a);
  const result2 = resultArray[0] + resultArray[1] + resultArray[2];
  console.log(`Total number of calories carried by the 3 elves carrying the most calories: ${result2}`);
};