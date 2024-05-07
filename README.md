<div align="center">
  <img
    height="100px"
    src="docs/img/logo.png"
    width="100px"
  />
</div>

<h1 align="center">
  Insights
</h1>

<div align="center">
  
  Visualize your coding journey!

</div>

<div align="center">

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

</div>

## About

> [!IMPORTANT]  
> This project is not associated with or endorsed by GitHub.

A fun, interactive web application to visualize your activity on GitHub.

## Features

- Issues and pull requests
  - See how many issues and pull requests you have opened or closed so far
- Top programming languages
  - See what are your most used programming, scripting or markup languages
- Topics
  - See which topics are most common across all your repositories

## Prerequisites

You should have the following software installed. The application has been tested with the following versions but more recent versions should be fine as well.

- `git: ^2.25.1`
- `node: ^v20.10.0`
- `npm: ^10.2.3`

It is also recommended to use Linux as everything has been tested only on a Linux distro. To use other operating systems, you may have to do some research of your own.

## Installation

Start by getting the source code. Use one of the following ways to clone the repository from the command line. Alternatively, you may download the source code as a [zip package](https://github.com/rikurauhala/insights/archive/refs/heads/main.zip).

```bash
# Get the source code via the command line
# Choose the way you are most familiar with

# Clone with SSH
$ git clone git@github.com:rikurauhala/insights.git

# Clone with HTTPS
$ git clone https://github.com/rikurauhala/insights.git

# Clone with GitHub CLI
$ gh repo clone rikurauhala/insights
```

Next, make sure you are in the correct folder and install dependencies. The application will not work without installing dependencies first!

```bash
# Change directory
$ cd insights

# Install dependencies
$ npm install
```

To use the application, you must use your own [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). The application will not work without it as the token is used to authenticate with the GitHub API and fetch all the data used by the application. You can create a new personal access token in the [settings](https://github.com/settings/tokens) of your GitHub account. Click the `Generate new token` button and choose `classic`. Choose a name and expiration time for the token. Select the scopes `repo` (everything) and `read:user`.

Paste your token in a file named `.env` at the root of the project. Your token should be the value of the variable `VITE_TOKEN`.

```bash
# File: .env

# Replace the string with your own personal access token
VITE_TOKEN='your-token-here'
```

> [!WARNING]  
> **Do not** commit or share your personal access token, it should remain private.

## Documentation

- [Architecture](./docs/architecture.md)
- [Credits](./docs/credits.md)
- [License](./LICENSE.md)
