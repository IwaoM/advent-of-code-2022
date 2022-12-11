class Monkey {
  static allMonkeys = [];

  static findMonkey (searchedId) {
    return Monkey.allMonkeys.find(elem => elem.id === searchedId);
  }

  constructor (inputStr) {
    this.id = this.testDivider = parseInt(inputStr.split("Monkey ")[1].split(":")[0]);
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
  }

  addItem (n) {
    this.itemArray.push(n);
  }

  processItems () {
    while (this.itemArray.length) {
      let item = this.itemArray.shift(); // take first item of the list
      item = this.operation(item); // inspect item
      this.inspectedCount++;
      item = Math.floor(item / 3); // apply relief
      const testResult = item % this.testDivider === 0;
      if (testResult) {
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
  const monkeyArray = [];
  for (let i = 0; i < inputArray.length; i++) {
    const newMonke = new Monkey(inputArray[i]);
    monkeyArray.push(newMonke);
  }

  for (let i = 0; i < 20; i++) {
    // console.log(`\nRound ${i + 1}`);
    for (let j = 0; j < monkeyArray.length; j++) {
      monkeyArray[j].processItems();
    }
    // for (let j = 0; j < monkeyArray.length; j++) {
    //   console.log(`Monkey ${j}: ${monkeyArray[j].itemArray}`);
    // }
  }

  const inspectedCountArray = [];
  for (let i = 0; i < monkeyArray.length; i++) {
    inspectedCountArray.push(monkeyArray[i].inspectedCount);
  }
  inspectedCountArray.sort((a, b) => b - a);
  const result1 = inspectedCountArray[0] * inspectedCountArray[1];
  console.log(`The level of monkey business after 20 rounds is: ${result1}`);
};