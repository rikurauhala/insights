# Testing

This document contains information about automated testing of the application.

## End-to-end testing

Automated testing for this application is done with [Cypress](https://www.cypress.io). Existing tests can be run with the command `npm run cypress:run`. The test output will be displayed in the console.

```bash
npm run cypress:run
```

When writing new tests, it is recommended to use the [Cypress App](https://docs.cypress.io/guides/getting-started/opening-the-app) and see the tests running in the browser. To launch the Cypress App, run `npm run cypress:open`. This project supports the [Mozilla Firefox](https://www.mozilla.org/en-US/firefox) and [Google Chrome](https://www.google.com/chrome) browsers so it is recommended to select either one.

```bash
npm run cypress:open
```

## Code coverage

<div align="center">

![Grid graph of the coverage](https://codecov.io/gh/rikurauhala/insights/graphs/tree.svg?token=956U3CZC68)
![Sunburst graph of the coverage](https://codecov.io/gh/rikurauhala/insights/graphs/sunburst.svg?token=956U3CZC68)

</div>

Code coverage for the tests is generated with [Istanbul](https://istanbul.js.org) via the [plugin](https://www.npmjs.com/package/vite-plugin-istanbul) for Vite. Code coverage is automatically calculated when running the tests. To view the coverage report after running the tests, open the file `coverage/lcov-report/index.html` in your preferred web browser.

```bash
firefox coverage/lcov-report/index.html
```

An interactive version of the coverage report is hosted on [Codecov](https://app.codecov.io/gh/rikurauhala/insights). The version corresponds to the latest commit in the `main` branch of the repository on GitHub.

## Continuous integration

The tests are always run when a commit is pushed to the `main` branch on GitHub or when a new pull request is opened. Tests are run with both Firefox and Chrome and an up-to-date coverage report is pushed to Codecov.

See the [main.yml](../.github/workflows/main.yml) workflow file for more details.
