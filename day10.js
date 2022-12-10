class Cpu {
  constructor () {
    this.register = [1];
    this.clock = 0;
    this.crtScreen = []; // part 2
  }

  tick (newVal) {
    this.clock++; // cycle begins : cycle number is incremented

    // part 2 : draw a pixel in the screen
    const posInRow = (this.clock - 1) % 40;
    const currentRegister = this.register[this.register.length - 1];
    if (!posInRow) { // start of a new row
      this.crtScreen.push("");
    }
    if (currentRegister - 1 <= posInRow && posInRow <= currentRegister + 1) {
      this.crtScreen[this.crtScreen.length - 1] += "#";
    } else {
      this.crtScreen[this.crtScreen.length - 1] += ".";
    }

    this.register.push(newVal ? newVal : currentRegister); // cycle ends : register is updated
  }

  noop () {
    this.tick();
  }

  addX (valToAdd) {
    this.tick();
    const newVal = this.register[this.register.length - 1] + valToAdd;
    this.tick(newVal);
  }

  registerDuringCycle (cycleNum) {
    return this.register[cycleNum - 1]; // the value during a given cycle is the last stored value before a new one is pushed at the end of the cycle
  }

  drawScreen () {
    for (let i = 0; i < 6; i++) {
      console.log(this.crtScreen[i]);
    }
  }
}

module.exports = function day10 (inputData) {
  const inputArray = inputData.split("\n");
  inputArray.pop(); // remove empty line at EOF

  //* Part 1
  const cpu = new Cpu();
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] === "noop") {
      cpu.noop();
    } else {
      cpu.addX(parseInt(inputArray[i].split(" ")[1]));
    }
  }
  let result1 = 0;
  for (let i = 20; i <= 220; i += 40) {
    result1 += cpu.registerDuringCycle(i) * i;
  }
  console.log(`Sum of the signal strengths during cycles 20, 60, 100, 140, 180 and 220: ${result1}`);

  //* Part 2
  console.log("");
  cpu.drawScreen();
};