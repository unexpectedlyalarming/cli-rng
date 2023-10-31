const chalk = require("chalk");

function setupCmd() {
  console.clear();
  for (let i = 100; i > 0; i--) {
    process.stdout.write("\n");
  }
  return;
}

module.exports = setupCmd;
