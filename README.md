# create-threejs-proj

A CLI for creating new [ThreeJS](https://threejs.org/) projects.

<p align="center">
  <img src="https://github.com/ivaneffable/create-threejs-proj/blob/main/screenshot-cli.png?raw=true" width="800">
</p>

## Usage

```sh
npx create-threejs-proj
```

If you want the dependencies to be autoinstalled after the project creation.

```sh
npx create-threejs-proj -i
```

## The ThreeJS project

- The CLI directly creates a Typescript project.
- We are using Vite, because is fast and easily configurable.
- ESLint is already configured extending `eslint:recommended` and `plugin:@typescript-eslint/recommended`.
- The project includes a basic prettier configuration.
- Git is also initialized for you.
