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

  describe('with data', () => {
    beforeEach(() => {
      cy.disableApiConnection()
      cy.intercept('GET', 'https://api.github.com/user', { fixture: 'user.json' })
      cy.visit('/')
    })

    it('contains profile picture', () => {
      cy.get('[data-cy=info-profile-picture]').should('exist')
      cy.get('[data-cy=info-profile-picture-skeleton]').should('not.exist')
    })

    it('contains name', () => {
      cy.get('[data-cy=info-name]').should('exist')
      cy.get('[data-cy=info-name-skeleton]').should('not.exist')
    })

    it('contains username', () => {
      cy.contains('Username')
      cy.get('[data-cy=info-username]').should('exist')
      cy.get('[data-cy=info-username-skeleton]').should('not.exist')
    })

    it('contains registration date', () => {
      cy.contains('Registered')
      cy.get('[data-cy=info-registered]').should('exist')
      cy.get('[data-cy=info-registered-skeleton]').should('not.exist')
    })

    it('contains location', () => {
      cy.contains('Location')
      cy.contains('United States')
      cy.get('[data-cy=info-location]').should('exist')
      cy.get('[data-cy=info-location-skeleton]').should('not.exist')
    })
  })

  describe('with data but no location', () => {
    beforeEach(() => {
      cy.disableApiConnection()
      cy.intercept('GET', 'https://api.github.com/user', { fixture: 'user2.json' })
      cy.visit('/')
    })

    it('contains unknown location', () => {
      cy.contains('Location')
      cy.contains('Unknown')
      cy.get('[data-cy=info-location]').should('exist')
      cy.get('[data-cy=info-location-skeleton]').should('not.exist')
    })
  })
})
