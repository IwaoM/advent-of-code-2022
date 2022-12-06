module.exports = function day6 (inputData) {
  // No parsing needed :o

  // turns out the algo for the 1st part can be used for the 2nd as well, so we turn it into a function
  function getMarkerIndex (markerLength, signal) {
    for (let i = markerLength; i < signal.length; i++) {
      const xCharsToSet = new Set(inputData.slice(i - markerLength, i));
      if (xCharsToSet.size === markerLength) {
        return i;
      }
    }
  }

  //* Part 1
  let result1 = getMarkerIndex(4, inputData);
  console.log(`The first start-of-packet marker is after character ${result1}`);

  //* Part 2
  let result2 = getMarkerIndex(14, inputData);
  console.log(`result2: ${result2}`);
};