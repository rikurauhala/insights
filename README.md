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

## Tech

<div align="center">

![CodeCov](https://img.shields.io/badge/codecov-%23ff0077.svg?style=for-the-badge&logo=codecov&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Dependabot](https://img.shields.io/badge/dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

</div>

## Status

<div align="center">

[![Continuous Integration](https://github.com/rikurauhala/insights/actions/workflows/main.yml/badge.svg)](https://github.com/rikurauhala/insights/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/rikurauhala/insights/graph/badge.svg?token=956U3CZC68)](https://codecov.io/gh/rikurauhala/insights)
[![Maintainability](https://api.codeclimate.com/v1/badges/1687d15a56957cd16aa4/maintainability)](https://codeclimate.com/github/rikurauhala/insights/maintainability)

</div>

## About

> [!IMPORTANT]  
> This project is not associated with or endorsed by GitHub.

A fun, interactive web application to visualize your activity on GitHub.

## Features

- Commits
  - See how many commits you have made each month or year
- Issues and pull requests
  - See how many issues and pull requests you have opened or closed so far
- Top programming languages
  - See what are your most used programming, scripting or markup languages
- Topics
  - See which topics are most common across all your repositories

## Installation

### Prerequisites

You should have the following software installed. The application has been developed and tested with these versions but more recent and some older versions should be fine as well. If you run into any issues, try updating to a newer version.

- `git: 2.25.1`
- `node: v20.10.0`
- `npm: 10.2.3`

You can check which version you have installed from the command line by typing the name of the command followed by the `--version` flag.

It is also recommended to use Linux as everything has been tested only on a Linux distro. To use other operating systems, you may have to do some research of your own.

### Download

Start by getting the source code by cloning the repository from the command line. Alternatively, you may download the source code as a [zip archive](https://github.com/rikurauhala/insights/archive/refs/heads/main.zip) or use [other methods](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

```bash
git clone git@github.com:rikurauhala/insights.git
```

### Install

Next, make sure you are in the correct folder and install dependencies. The application will not work without installing dependencies first!

```bash
cd insights && npm install
```

### Configure

> [!WARNING]  
> **Do not** commit or share your personal access token, it should remain private.

To use the application, you must use your own [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). The application **will not work without it** as the token is used to authenticate with the GitHub API and fetch all the data used by the application.

You can create a new personal access token in the [settings](https://github.com/settings/tokens) of your GitHub account.

1. Click the `Generate new token` button and choose `classic`
2. Choose a name and expiration time for the token
3. Select the scopes `repo` (everything) and `read:user`
4. Copy your token

Paste your token in a file named `.env` at the root of the project directory. Your token should be the value of the variable `VITE_TOKEN`.

```bash
echo 'VITE_TOKEN=your-token' >> .env
```

The file should look like this

```bash
# File: .env

VITE_TOKEN='your-token'
```

### Run

To start the application in your browser, run the `dev` command. By default the application should be available at http://localhost:5173. Run `npm run dev -- --host` to access the application from your network with another device.

```bash
npm run dev
```

## Documentation

- [Architecture](./docs/architecture.md)
- [Contributing](./docs/contributing.md)
- [Credits](./docs/credits.md)
- [License](./LICENSE.md)
- [Security](./docs/security.md)
- [Testing](./docs/testing.md)
