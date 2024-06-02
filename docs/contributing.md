# Contributing

Hello there and thank you for your interest! **Insights** is an open source project and all contributions are welcome. Please read this document before opening a new issue or a pull request. The aim is to make contributing as easy and beginner friendly as possible.

If you have any questions, you may email the [maintainer](https://github.com/rikurauhala) directly.

## Reporting an issue

Bugs or other unexpected behaviour can be reported using the [Issues](https://github.com/rikurauhala/insights/issues) page. Try to describe the problem in detail to make it easier to fix.

Don't hesitate to report an issue you may have found with the application. Even minor typo corrections are appreciated.

## Suggesting improvements

New features can be suggested or requested by opening a new issue. If you wish to contribute to the source code, fork the repository and make a [pull request](https://github.com/rikurauhala/insights/pulls). Please explain what you did and how you think it would improve the application! Your pull request will be reviewed as soon as possible. If you don't have any new ideas but would still like to contribute, take a look at the list of [open issues](https://github.com/rikurauhala/insights/issues).

Make as many pull requests as you want. It is recommended to keep a pull request small and to not change too many things at once. Don't make a pull request you wouldn't want to review yourself!

Refactoring, testing and optimizing existing code is also highly encouraged.

## Style

### ESLint

[ESLint](https://eslint.org) is used to enforce a consistent code style. The file [.eslintrc](https://github.com/rikurauhala/insights/blob/main/.eslintrc) contains the specific rules the code should follow. Before making a pull request, check the code style with `npm run lint` and fix any issues that are detected.

### Prettier

[Prettier](https://prettier.io) is used to format the code. Formatting can be done manually by running `npm run format` or automatically when saving a file, if you have the [plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) installed.

### Commits

Keep the commits small so they are easy to handle. Don't change too many things per commit. Commit messages should be descriptive. Pay attention to good grammar and use the _imperative mood_.

```bash
# Yes
$ git commit -m "Create README.md"

# No
$ git commit -m "Changed something"
$ git commit -m "Created README.md"
$ git commit -m "README"
$ git commit -m "Some changes"
$ git commit -m "Removed some links"
```

## Development

If you wish you contribute to the source code itself, here's how to install the application and start developing on your machine. You should be familiar with React, JavaScript/TypeScript and have Node.js installed. I would recommend using Visual Studio Code but any other editor will do just fine if Code is not your thing.

### How to install

```bash
# Get the source code
$ git clone git@github.com:rikurauhala/insights.git

# Change directory
$ cd insights

# Install dependencies
$ npm install
```

### How to run

After running the application, your default browser should automatically open and the app should be running locally. If not, go to http://localhost:5173 manually.

```bash
# Run the application
$ npm run dev
```

### How to test

Please make sure to always run tests before creating a pull request to ensure nothing breaks.

```bash
# Run tests
$ npm run cypress:run
```

## Resources

Here are some useful resources.

- [Cypress documentation](https://docs.cypress.io)
- [GitHub documentation](https://docs.github.com/en)
  - [GitHub REST API documentation](https://docs.github.com/en/rest)
- [React.js documentation](https://react.dev)
- [Material UI documentation](https://mui.com/material-ui)
  - [Material icons](https://mui.com/material-ui/material-icons)
  - [MUI X Charts](https://mui.com/x/react-charts)
- [TypeScript documentation](https://www.typescriptlang.org/docs)
