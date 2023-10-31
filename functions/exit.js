const setupCmd = require("../utils/setupCmd");

function exit() {
  setupCmd();
  process.exit();
}

module.exports = exit;
