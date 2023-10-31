const chalk = require("chalk");
const prompt = require("prompt-sync")({ sigint: true });
const cliCursor = require("cli-cursor");
const setupCmd = require("./utils/setupCmd");
const keypress = require("keypress");
const exit = require("./functions/exit");
//Global vars

let menuIsRunning = true;

//Commandline setup

cliCursor.hide();

setupCmd();

//Allow exiting with ctrl+c

process.on("SIGINT", function () {
  exit();
});

//Define menu items

const menuItems = [
  {
    name: "Dice roll",
    action: "dice",
  },
  {
    name: "Coin flip",
    action: "coin",
  },
  {
    name: "Magic 8 ball",
    action: "magic",
  },
  {
    name: "Spinner",
    action: "spinner",
  },
  {
    name: "Entropic Number Generator",
    action: "entropic",
  },
  {
    name: "Exit",
    action: exit,
  },
];

//Define menu function

function menu() {
  let selection = 0;

  keypress(process.stdin);

  process.stdin.on("keypress", function (ch, key) {
    if (key) {
      if (key.name === "up" && selection > 0) {
        selection--; // Move up the menu
      } else if (key.name === "down" && selection < menuItems.length - 1) {
        selection++; // Move down the menu
      } else if (key.name === "return") {
        // Execute the selected option's action
        menuItems[selection].action();
      }
      // Redraw the menu
      renderMenu();
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

  function renderMenu() {
    setupCmd();

    // Display the menu options with highlighting
    for (let i = 0; i < menuItems.length; i++) {
      if (i === selection) {
        console.log(chalk.bgBlue.white(` ${i + 1}. ${menuItems[i].name} `));
      } else {
        console.log(` ${i + 1}. ${menuItems[i].name}`);
      }
    }
  }

  // Initial rendering of the menu
  renderMenu();
}

menu();
