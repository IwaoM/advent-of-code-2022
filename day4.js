module.exports = function day4 (inputData) {
  const inputArray = inputData.split("\n");

  // Part 1
  let result1 = 0;
  // console.log(`result1 = ${result1}\n`);
  for (let i = 0; i < inputArray.length; i++) {
    // parsing
    const elf1 = inputArray[i].split(",")[0], elf2 = inputArray[i].split(",")[1];
    const elf1Start = parseInt(elf1.split("-")[0]), elf1End = parseInt(elf1.split("-")[1]);
    const elf2Start = parseInt(elf2.split("-")[0]), elf2End = parseInt(elf2.split("-")[1]);

    // checking if one elf's range of sections fully contains the other
    if (elf1Start <= elf2Start && elf1End >= elf2End || elf2Start <= elf1Start && elf2End >= elf1End) {
      result1++;
    }
  }
  console.log(`Number of assignment pairs in which one range fully contains the other: ${result1}`);

  // Part 2
  let result2 = 0;
  console.log(`Sum of the priorities of badges: ${result2}`);
};