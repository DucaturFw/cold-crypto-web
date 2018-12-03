describe('login test', () =>
{
	function showQr(elemSelector: string, qrName: string)
	{
		cy.wait(800)
		cy.document().then(doc =>
		{
			cy.fixture(`qr/${qrName}.mp4`, 'base64').then(mov =>
			{
				let uri = `data:video/mp4;base64,${mov}`
				let el = doc.querySelector(elemSelector)

				if (!el)
					throw `video element "${elemSelector}" not found`
		
				el.setAttribute('src', uri)
				cy.get('video').should('have.attr', 'src', uri)
			})
		})
		cy.wait(600)
	}
	it('should render login page correctly', () =>
	{
		cy.visit('/')
		cy.contains('Login using QR code').click()
		cy.url().should('include', '/login')
	})

	it('should login with qr', () =>
	{
		cy.visit('/')
		cy.contains('Login using QR code').click()

		showQr('video', 'login_single_eth_wallet')

		cy.url().should('include', '/wallets')
		cy.contains('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0')
	})
	
	it.skip('should login with qr multiple wallets', () =>
	{
		cy.visit('/')
		cy.contains('Login using QR code').click()
		
		showQr('video', 'login_multiple_eth_wallets')

		cy.url().should('include', '/wallets')
		cy.contains('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0')
		cy.contains('0x30384424F1Ab508F1f82b58f1335f343ABdF68AE')
		cy.contains('0x1AD80eC32FD6Ef24e80801e90C5f7e32950C2D05')
	})
})