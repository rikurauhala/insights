describe('Info section', () => {
  describe('with no data', () => {
    beforeEach(() => {
      cy.disableApiConnection()
      cy.visit('/')
    })

    it('does not contain profile picture', () => {
      cy.get('[data-cy=info-profile-picture]').should('not.exist')
      cy.get('[data-cy=info-profile-picture-skeleton]').should('exist')
    })

    it('does not contain name', () => {
      cy.get('[data-cy=info-name]').should('not.exist')
      cy.get('[data-cy=info-name-skeleton]').should('exist')
    })

    it('does not contain username', () => {
      cy.contains('Username')
      cy.get('[data-cy=info-username]').should('not.exist')
      cy.get('[data-cy=info-username-skeleton]').should('exist')
    })

    it('does not contain registration date', () => {
      cy.contains('Registered')
      cy.get('[data-cy=info-registered]').should('not.exist')
      cy.get('[data-cy=info-registered-skeleton]').should('exist')
    })

    it('does not contain location', () => {
      cy.contains('Location')
      cy.get('[data-cy=info-location]').should('not.exist')
      cy.get('[data-cy=info-location-skeleton]').should('exist')
    })
  })
})
