# create-threejs-proj

A CLI for creating new [ThreeJS](https://threejs.org/) projects.

<img src="https://github.com/ivaneffable/create-threejs-proj/blob/main/screenshot.png?raw=true" width="500">

## Usage

```sh
npx create-threejs-proj
```

If you prefer to create a Typescript project.

```sh
npx create-threejs-proj -t
```

If you want the dependencies to be autoinstalled after the project creation.

```sh
npx create-threejs-proj -i
```

## The ThreeJS project

- The CLI allows you to create a Typescript or a Javascript project.
- We are using [Vite](https://vitejs.dev/), because is fast and easily configurable.
- [ESLint](https://eslint.org/) is already configured.
- The project includes a basic [prettier](https://prettier.io/) configuration.
- Git is also initialized for you.
