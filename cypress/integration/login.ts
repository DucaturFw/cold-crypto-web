describe('Login test', () => {
  it('Should render session QR correctly', () => {
    cy.visit('http://localhost:4444/cold-crypto-web/')
    cy.contains('Connected as')
    cy.contains('Login using QR code').click()
    cy.url().should('include', '/login')
    cy.get('svg').should('have.length', 1)
  })
})

