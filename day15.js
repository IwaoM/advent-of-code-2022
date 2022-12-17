class Sensor {
  static sensorList = [];
  static xMax;
  static xMin;

  constructor (x, y, xBeacon, yBeacon) {
    this.x = x;
    this.y = y;
    this.xBeacon = xBeacon;
    this.yBeacon = yBeacon;
    this.range = Math.abs(xBeacon - x) + Math.abs(yBeacon - y);

    Sensor.sensorList.push(this);
    if (Sensor.xMax == null || Sensor.xMax < this.x + this.range) {
      Sensor.xMax = this.x + this.range;
    }
    if (Sensor.xMin == null || Sensor.xMin > this.x - this.range) {
      Sensor.xMin = this.x - this.range;
    }
  }

  coversCoords (x, y) {
    return this.range >= Math.abs(x - this.x) + Math.abs(y - this.y);
  }

  static anyCoversCoords (x, y) {
    let covered = false;
    for (let i = 0; i < Sensor.sensorList.length; i++) {
      if (Sensor.sensorList[i].coversCoords(x, y)) {
        covered = true;
        break;
      }
    }
    return covered;
  }

  static getSensorCoveringCoords (x, y) { // used for part 2
    let coveringSensor = null;
    for (let i = 0; i < Sensor.sensorList.length; i++) {
      if (Sensor.sensorList[i].coversCoords(x, y)) {
        coveringSensor = Sensor.sensorList[i];
        break;
      }
    }
    return coveringSensor;
  }

  static beaconExistsInCoords (x, y) {
    let exists = false;
    for (let i = 0; i < Sensor.sensorList.length; i++) {
      if (Sensor.sensorList[i].xBeacon == x && Sensor.sensorList[i].yBeacon == y) {
        exists = true;
        break;
      }
    }
    return exists;
  }
}

module.exports = function day15 (inputData) {
  //* Parsing
  console.log(`== PARSING ==`);
  let date1 = new Date();
  const inputArray = inputData.split("\n");
  inputArray.pop(); // remove empty line at EOF
  const parsedArray = [];

  for (let i = 0; i < inputArray.length; i++) {
    const x = parseInt(inputArray[i].split("x=")[1].split(",")[0]);
    const y = parseInt(inputArray[i].split("y=")[1].split(":")[0]);
    const xb = parseInt(inputArray[i].split("x=")[2].split(",")[0]);
    const yb = parseInt(inputArray[i].split("y=")[2]);
    new Sensor(x, y, xb, yb);
    parsedArray.push([x, y, xb, yb]);
  }
  let date2 = new Date();

  console.log(`xMin = ${Sensor.xMin}, xMax = ${Sensor.xMax}`);
  console.log(`Execution time: ${(date2 - date1) / 1000}s\n`);

  //* Part 1
  console.log(`== PART 1 ==`);
  date1 = new Date();

  const checkedY = 2000000;
  let result1 = 0;
  for (let i = Sensor.xMin; i <= Sensor.xMax; i++) {
    if (Sensor.anyCoversCoords(i, checkedY) && !Sensor.beaconExistsInCoords(i, checkedY)) {
      result1++;
    }
  }
  date2 = new Date();

  console.log(`Number of positions that cannot contain a beacon in row y = ${checkedY}: ${result1}`);
  console.log(`Execution time: ${(date2 - date1) / 1000}s\n`);

  //* Part 2
  console.log(`== PART 2 ==`);
  date1 = new Date();

  const coordMin = 0, coordMax = 4000000;
  let result2 = 0, beaconCoords = [];

  // bruteforcing part 1's approach would take too much time (something like 12 or 13 hours ?)
  // instead, use a new, more optimized strategy

  let j = coordMin;
  while (j <= coordMax) {
    let i = coordMin;
    while (i <= coordMax) {
      const coveringSensor = Sensor.getSensorCoveringCoords(i, j);
      if (coveringSensor) {
        i = coveringSensor.x + coveringSensor.range - Math.abs(coveringSensor.y - j) + 1;
        // the above operation makes i jump to the first position in the current row outside of coveringSensor's range
      } else {
        beaconCoords.push(i, j);
        break;
      }
    }
    if (beaconCoords.length) {
      break;
    }
    j++;
  }

  result2 = 4000000 * beaconCoords[0] + beaconCoords[1];
  date2 = new Date();

  console.log(`Tuning frequency for the distress beacon in [${beaconCoords[0]}, ${beaconCoords[1]}] : ${result2}`);
  console.log(`Execution time: ${(date2 - date1) / 1000}s`);
};