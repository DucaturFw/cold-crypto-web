describe('Login test', () => {
  it('Should login by QR correctly', () => {
    cy.visit('http://localhost:4444/cold-crypto-web/')
    cy.contains('Connected as')
    cy.contains('Login using QR code').click()
    cy.url().should('include', '/login')
    cy.get('svg').should('have.length', 1)

    cy.document().then((doc) => {
      cy.fixture('login_qr_video.mov', 'base64').then((mov) => {
        const uri = `data:video/mp4;base64,${mov}`
        doc.querySelector('video').src = uri

        cy.url().should('include', '/wallets')
        cy.get('a:nth(1)').should('have.attr', 'href', '/cold-crypto-web/wallet/eth/0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0')
        cy.get('a:nth(3)').should('have.attr', 'href', '/cold-crypto-web/wallet/eth/0x30384424F1Ab508F1f82b58f1335f343ABdF68AE')
        cy.get('a:nth(5)').should('have.attr', 'href', '/cold-crypto-web/wallet/eth/0x1AD80eC32FD6Ef24e80801e90C5f7e32950C2D05')
      })
    })
  })
})

