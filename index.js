#!/usr/bin/env node

const CLI = require("clui");

const inquirer = require("inquirer");

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

const dirExists = require("./helpers/file").directoryExists;
const mkDir = require("./helpers/file").createDirectory;
const createComponent = require("./helpers/component").createComponent;

clear();
console.log(
  chalk.blueBright(
    figlet.textSync("React Generator", { horizontalLayout: "full" })
  )
);
const componentName = process.argv[2];
const questions = [
  {
    name: "componentType",
    type: "list",
    message: "Component type:",
    choices: ["Functional", "Class"],
    default: "Functional"
  },
  {
    name: "stylesType",
    type: "list",
    message: "Component styles:",
    choices: ["Modular CSS", "Modular SASS", "CSS", "SASS", "JSS"],
    default: "CSS"
  },
  {
    name: "test",
    type: "list",
    message: "Create Jest Test?:",
    choices: ["Yes", "No"],
    default: "Yes"
  }
];
inquirer.prompt(questions).then(answers => {
  const spinner = new CLI.Spinner("Creating necessary files...");
  spinner.start();
  if (dirExists(componentName)) {
    createComponent({ ...answers, componentName });
  } else {
    mkDir(componentName);
    createComponent({ ...answers, componentName });
  }
  spinner.stop();
  console.log("Component Successfully Created!");
});
