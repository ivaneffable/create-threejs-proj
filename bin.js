#!/usr/bin/env node

import arg from "arg";
import inquirer from "inquirer";

import { createProject } from "./cli.js";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--install": Boolean,
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    projectName: args._[0],
    runInstall: args["--install"],
  };
}

async function promptForMissingOptions(options) {
  const questions = [];
  if (!options.projectName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "Please enter a project name",
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
