/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      disableApiConnection(): Chainable<void>
    }
  }
}

Cypress.Commands.add('disableApiConnection', () => {
  cy.intercept('**://*.github.com/**', {
    statusCode: 204,
    body: '',
  })
})

export {}
