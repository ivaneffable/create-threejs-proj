#!/usr/bin/env node

import arg from "arg";
import inquirer from "inquirer";

import { createProject } from "./cli.js";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--install": Boolean,
      "--typescript": Boolean,
      "-i": "--install",
      "-t": "--typescript",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    projectName: args._[0],
    runInstall: args["--install"],
    useTypescript: args["--typescript"],
  };
}

async function promptForMissingOptions(options) {
  const questions = [];
  if (!options.projectName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "Please enter a project name:",
    });
  }

  if (!options.useTypescript) {
    questions.push({
      type: "confirm",
      name: "useTypescript",
      message: "Use Typescript?",
      default: true,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    ...answers,
  };
}

let options = parseArgumentsIntoOptions(process.argv);
options = await promptForMissingOptions(options);

createProject(options);
