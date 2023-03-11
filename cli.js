import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import { execa } from "execa";
import Listr from "listr";
import { projectInstall } from "pkg-install";

const copy = promisify(ncp);

async function initGit(cwd) {
  const result = await execa("git", ["init"], {
    cwd,
  });
}

async function prearePackageJson(options) {
  let contents = await fs.promises.readFile(
    `${options.templateDirectory}/package.json`,
    "utf8"
  );
  contents = contents.replace("~NAME~", options.projectName);
  await fs.promises.writeFile(
    `${options.templateDirectory}/package.json`,
    contents
  );
}

async function copyTemplateFiles(options) {
  await prearePackageJson(options);
  await copy(options.templateDirectory, options.projectName, {
    clobber: false,
  });
  await fs.promises.rename(
    `${options.projectName}/gitignore.tmp`,
    `${options.projectName}/.gitignore`
  );
}

export async function createProject(options) {
  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    `../template/${options.useTypescript ? "typescript" : "javascript"}`
  );
  options.templateDirectory = templateDir;

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },
    {
      title: "Initialize git",
      task: () => initGit(options.projectName),
    },
    {
      title: "Install dependencies",
      task: () =>
        projectInstall({
          cwd: options.projectName,
        }),
      skip: () =>
        !options.runInstall
          ? "Pass --install to automatically install dependencies"
          : undefined,
    },
  ]);

  await tasks.run();

  console.log("%s Project ready", chalk.green.bold("DONE"));

  console.log(chalk.green("\nNext steps:"));

  console.log(`  ${chalk.cyan(`cd ${options.projectName}`)}`);

  if (!options.runInstall) {
    console.log(`  ${chalk.cyan("npm install")}`);
  }

  console.log(`  ${chalk.cyan("npm run dev -- --open")}`);

  console.log(`\nTo close the dev server, hit ${chalk.cyan("Ctrl-C")}`);

  return true;
}
