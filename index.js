const readline = require("readline");
const dailyScripts = [];

for (let i = 1; i < 25; i++) {
  try {
    dailyScripts.push(require(`./day${i}`));
  } catch (err) {
    break;
  }
}

function runDailyScript () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Which day? ", function (dayNumber) {
    dayNumber = Number(dayNumber);
    if (dayNumber && dayNumber >= 1 && dayNumber < 25) {
      console.log(`Running the script for day ${dayNumber}`);
      if (dailyScripts.length >= dayNumber) {
        dailyScripts[dayNumber - 1]();
      } else {
        console.log("This script does not exist yet");
      }
    } else {
      console.log("Invalid input");
    }
    rl.close();
  });
}

runDailyScript();