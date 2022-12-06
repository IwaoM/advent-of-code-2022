module.exports = function day6 (inputData) {
  // No parsing needed :o

  //* Part 1
  let result1;
  for (let i = 4; i < inputData.length; i++) {
    const fourCharsToSet = new Set(inputData.slice(i - 4, i));
    if (fourCharsToSet.size === 4) {
      result1 = i;
      break;
    }
  }
  console.log(`The first start-of-packet marker is after character ${result1}`);

  //* Part 2
  let result2;
  console.log(`result2: ${result2}`);
};