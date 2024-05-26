describe('Info section', () => {
  describe('with no data', () => {
    beforeEach(() => {
      cy.intercept('**://*.github.com/**', {
        statusCode: 204,
        body: '',
      })
      cy.visit('/')
    })

    it('contains subtitles', () => {
      cy.contains('Username')
      cy.contains('Registered')
      cy.contains('Location')
    })

    it('contains loading skeletons', () => {
      cy.get('[data-cy=info-skeleton-name]').should('exist')
      cy.get('[data-cy=info-skeleton-username]').should('exist')
      cy.get('[data-cy=info-skeleton-registered]').should('exist')
      cy.get('[data-cy=info-skeleton-location]').should('exist')
    })
  })
})
