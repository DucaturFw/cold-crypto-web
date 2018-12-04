import { reset as resetWebrtc } from "../../src/helpers/webrtc/webrtcsingleton"

import { checkShownQr, showQr, checkWebrtcQr } from "./interact_qr"
import { connectWebrtc } from "./interact_webrtc"

describe('login test', () =>
{
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

		checkShownQr(/getWalletList\|\d+\|{"blockchains":\["eth","eos"\]}/)
		showQr('video', 'login_single_eth_wallet')

		cy.url().should('include', '/wallets')
		cy.contains(/eth wallet/i)
		cy.contains('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0')
	})

	it('should login directly on /login', () =>
	{
		cy.visit('/login')

		checkShownQr(/^getWalletList\|\d+\|{"blockchains":\["eth","eos"\]}$/)
		showQr('video', 'login_single_eth_wallet')
		
		cy.url().should('include', '/wallets')
		cy.contains(/eth wallet/i)
		cy.contains('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0')
	})

	it('should open webrtc login page', async () =>
	{
		cy.visit('/')
		// cy.contains('WebRTC login').click()
		cy.contains(/WebRTC login/i).click()

		cy.url().should('match', /[\/webrtc|\/login\?rtc=true]/)

		await checkWebrtcQr()
	})
	it.skip('should navigate directly to webrtc login page', async () =>
	{
		cy.visit('/login?webrtc=true')

		await checkWebrtcQr()
	})

	it('should connect webrtc', async () =>
	{
		cy.visit('/')
		cy.contains(/WebRTC login/i).click()
		
		resetWebrtc()
		
		await connectWebrtc()
	})
	it('should connect webrtc 2nd time', async () =>
	{
		cy.visit('/')
		cy.contains(/WebRTC login/i).click()

		resetWebrtc()
		
		await connectWebrtc()
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