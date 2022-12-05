const fs = require("node:fs");
const path = require("node:path");
const readline = require("readline");
const dailyScripts = [];

for (let i = 1; i <= 25; i++) {
  try {
    dailyScripts.push(require(`./day${i}`));
  } catch (err) {
    break;
  }
}

const inputFolder = path.join(__dirname, "inputs");

function runDailyScript () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\n===================\nADVENT OF CODE 2022\n===================\n");
  rl.question("Which day? ", function (dayNumber) {
    dayNumber = Number(dayNumber);
    if (dayNumber && dayNumber >= 1 && dayNumber <= 25) {

      if (dailyScripts.length >= dayNumber) {

        const inputDir = path.join(inputFolder, dayNumber + ".txt");

        try {
          const inputData = fs.readFileSync(inputDir, { encoding:"utf8", flag:"r" });
          console.log(`\nInput data '${dayNumber}.txt' retrieved`);
          console.log(`Running the script for day ${dayNumber}\n\n===================\n`);

          try {
            dailyScripts[dayNumber - 1](inputData);
          } catch (err) {
            console.error("\nError when executing the script");
            console.error(err.stack);
          }

        } catch {
          console.error("\nError when reading input file");
        }

      } else {
        console.error("\nThis script does not exist yet");
      }

    } else {
      console.error("\nInvalid input");
    }
    rl.close();
    console.log("\n===================");
  });
}

runDailyScript();