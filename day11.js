class Monkey {
  static allMonkeys = [];
  static commonDivider = 1;

  static findMonkey (searchedId) {
    return Monkey.allMonkeys.find(elem => elem.id === searchedId);
  }

  static clearAllMonkeys () {
    Monkey.allMonkeys = [];
    Monkey.commonDivider = 1;
  }

  constructor (inputStr) {
    this.id = parseInt(inputStr.split("Monkey ")[1].split(":")[0]);
    this.inspectedCount = 0;

    this.itemArray = inputStr.split("items: ")[1].split("\n")[0].split(", ");
    this.itemArray = this.itemArray.map(elem => parseInt(elem));

    // only * and + are supported here
    const operationComponents = inputStr.split("new = old ")[1].split("\n")[0].split(" ");
    if (operationComponents[0] === "*" && operationComponents[1] === "old") {
      this.operation = val => val * val;
    } else if (operationComponents[0] === "*") {
      this.operation = val => val * parseInt(operationComponents[1]);
    } else if (operationComponents[0] === "+" && operationComponents[1] === "old") {
      this.operation = val => val + val;
    } else {
      this.operation = val => val + parseInt(operationComponents[1]);
    }

    this.testDivider = parseInt(inputStr.split("divisible by ")[1].split("\n")[0]);

    this.nextIfTrue = parseInt(inputStr.split("If true: throw to monkey ")[1].split("\n")[0]);
    this.nextIfFalse = parseInt(inputStr.split("If false: throw to monkey ")[1].split("\n")[0]);

    Monkey.allMonkeys.push(this);
    Monkey.commonDivider *= this.testDivider; // for part 2
  }

  addItem (n) {
    this.itemArray.push(n);
  }

  processItems (applyRelief = true, log = false) {
    if (log) { console.log(`Monkey ${this.id} - list: ${this.itemArray} - inspectedCount: ${this.inspectedCount}`); }
    while (this.itemArray.length) {
      let item = this.itemArray.shift(); // take first item of the list
      // if (log) { console.log(`  Monkey inspects item with worry level ${item}`); }

      if (!applyRelief) {
        item %= Monkey.commonDivider;
        item += Monkey.commonDivider;
      }
      // part 2: reduce the number
      // this reduction keeps its modulo properties (i.e. the division test stays valid):
      // for any divider, if commonDivider is a multiple of divider, (a + b) % divider == ((a % commonDivider) + b) % divider
      // for any divider, if commonDivider is a multiple of divider, (a * b) % divider == ((a % commonDivider) * b) % divider
      // so for this to work for all dividers, commonDivider should be a common multiple of all dividers (here, their product)

      item = this.operation(item); // inspect item

      this.inspectedCount++;

      if (applyRelief) {
        item = Math.floor(item / 3); // apply relief
      }

      // const testResult = item % this.testDivider === 0;
      const testResult = item % this.testDivider;
      if (testResult === 0) {
        Monkey.findMonkey(this.nextIfTrue).addItem(item);
      } else {
        Monkey.findMonkey(this.nextIfFalse).addItem(item);
      }
    }
  }

}

module.exports = function day11 (inputData) {
  const inputArray = inputData.split("\n\n");

  //* Part 1
  const monkeyArray1 = [];
  for (let i = 0; i < inputArray.length; i++) {
    const newMonke = new Monkey(inputArray[i]);
    monkeyArray1.push(newMonke);
  }

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < monkeyArray1.length; j++) {
      monkeyArray1[j].processItems();
    }
  }

  const inspectedCountArray1 = [];
  for (let i = 0; i < monkeyArray1.length; i++) {
    inspectedCountArray1.push(monkeyArray1[i].inspectedCount);
  }
  inspectedCountArray1.sort((a, b) => b - a);
  const result1 = inspectedCountArray1[0] * inspectedCountArray1[1];
  console.log(`The level of monkey business after 20 rounds is: ${result1}`);

  Monkey.clearAllMonkeys ();

  //* Part 2
  const monkeyArray2 = [];
  for (let i = 0; i < inputArray.length; i++) {
    const newMonke = new Monkey(inputArray[i]);
    monkeyArray2.push(newMonke);
  }

  const maxSteps = 10000;

  for (let i = 0; i < maxSteps; i++) {
    // console.log(`\n== ROUND ${i + 1} ==`);
    for (let j = 0; j < monkeyArray2.length; j++) {
      monkeyArray2[j].processItems(false);
    }
  }

  const inspectedCountArray2 = [];
  for (let i = 0; i < monkeyArray2.length; i++) {
    inspectedCountArray2.push(monkeyArray2[i].inspectedCount);
  }
  inspectedCountArray2.sort((a, b) => b - a);
  const result2 = inspectedCountArray2[0] * inspectedCountArray2[1];
  console.log(`The level of monkey business (without relief) after ${maxSteps} rounds is: ${result2}`);
};