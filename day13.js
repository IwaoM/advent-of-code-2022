function comparePackets (left, right, logging = false) {
  if (logging) {
    console.log(`Compare ${JSON.stringify(left)} and ${JSON.stringify(right)}`);
  }
  let result = 0;
  if (typeof left === "number" && typeof right === "number") {
    // if left & right are integers : ok if left < right, ko if right < left, undetermined if left == right
    result = left < right ? 1 : left > right ? -1 : 0;
  } else if (typeof left === "object" && typeof right === "object") {
    // if left & right are arrays : compare array values until ok or ko is returned or array end is reached
    for (let i = 0; i < left.length && i < right.length; i++) {
      result = comparePackets(left[i], right[i], logging);
      if (result) {
        break;
      }
    }
    // if values comparison returns undetermined, compare array lengths
    // ok if left.length < right.length, ko if right.length < left.length, still undetermined if left.length == right.length
    if (!result && left.length != right.length) {
      if (logging && left.length > right.length) {
        console.log(`End of ${JSON.stringify(right)} reached, array is shorter than ${JSON.stringify(left)}`);
      } else if (logging) {
        console.log(`End of ${JSON.stringify(left)} reached, array is shorter than ${JSON.stringify(right)}`);
      }
      result = left.length < right.length ? 1 : -1;
    }
    if (!result && logging) {
      console.log(`Going up one level`);
    }
  } else {
    // if either left or right is an integer and the other is an array, put the integer in an array and compare the arrays
    result = typeof left === "number" ? comparePackets([left], right, logging) : comparePackets(left, [right], logging);
  }
  if (result && logging) {
    console.log(`${JSON.stringify(left)} and ${JSON.stringify(right)}: ${result == 1 ? "right" : "wrong"} order`);
  }
  return result;
}

module.exports = function day13 (inputData) {
  //* Part 1
  const inputArray1 = inputData.split("\n\n");
  console.log(`== PART 1 ==`);
  let result1 = 0;
  const packetPairs = inputArray1.map(elem => [elem.split("\n")[0], elem.split("\n")[1]]);
  for (let i = 0; i < packetPairs.length; i++) {
    if (comparePackets(JSON.parse(packetPairs[i][0]), JSON.parse(packetPairs[i][1])) == 1) {
      result1 += i + 1;
    }
    // console.log("");
  }
  console.log(`The sum of indices of the pairs in the right order is: ${result1}\n`);

  //* Part 2
  console.log(`== PART 2 ==`);
  const inputArray2 = inputData.split("\n");

  //remove empty rows
  for (let i = inputArray2.length - 1; i >= 0; i--) {
    if (i % 3 == 2) {
      inputArray2.splice(i, 1);
    }
  }

  inputArray2.push("[[2]]", "[[6]]");
  // good thing I thought of making comparePackets() a compare function usable by array.sort()
  inputArray2.sort((a, b) => comparePackets(JSON.parse(b), JSON.parse(a)));
  // console.log(inputArray2);
  const result2 = (inputArray2.indexOf("[[2]]") + 1) * (inputArray2.indexOf("[[6]]") + 1);
  console.log(`The decoder key for the distress signal is: ${result2}`);
};