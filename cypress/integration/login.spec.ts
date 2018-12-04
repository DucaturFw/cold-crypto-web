import { parseHostMessage, IHCSimple } from "../../src/helpers/webrtc/hostproto"
import { reset as resetWebrtc, singleton } from "../../src/helpers/webrtc/webrtcsingleton"
import { RequestHandlerTuple } from "../../src/helpers/webrtc/jsonrpc"

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
	function fillEthTx()
	{
		cy.url().should('include', '/tx/create')
		cy.contains('To:').next('input').type('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0')
		cy.contains('Enter amount:').next('div').children('strong').children('input').as("ethvalinput")
		cy.get('@ethvalinput').first().type('45.012345')
		cy.get('@ethvalinput').last().its('attr').should((attr) => parseInt(attr('value') + "").toString() == attr('value'))
	}
	it('should open tx creation window', () =>
	{
		cy.visit('/login')

		showQr('video', 'login_single_eth_wallet')
		cy.contains(/create new tx/i).click()

		fillEthTx()

		cy.contains('Continue').click()
	})
	interface IEthTransaction
	{
		to: string
		value: string
		nonce: number
		gasPrice: string
	}
	interface IWallet
	{
		blockchain: "eth" | "eos"
		address: string
		chainId: string | number
	}
	it('should generate tx request', async () =>
	{
		cy.visit('/login')

		showQr('video', 'login_single_eth_wallet')
		cy.contains(/create new tx/i).click()
		fillEthTx()
		cy.contains('Continue').click()

		let qr = await checkShownQr(/^signTransferTx\|\d+\|.+$/)
		let msg = parseHostMessage(qr) as IHCSimple<{ tx: IEthTransaction }, { wallet: IWallet }>
		expect(msg.method).eq('signTransferTx')
		expect(msg.params).not.null
		let [tx, wallet] = Array.isArray(msg.params) ? msg.params : [msg.params.tx, msg.params.wallet]
		
		expect(wallet.address.toLowerCase()).eq('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0'.toLowerCase())
		expect(wallet.blockchain).eq('eth')
		expect(wallet.chainId.toString()).eq('4')

		expect(tx.value).eq('45012345000000000000')
		assert.isNumber(tx.nonce)
		expect(tx.gasPrice).match(/^[^0]\d+00000000$/)
		expect(tx.to.toLowerCase()).eq(wallet.address.toLowerCase())
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
	it.only('should sign webrtc tx', async () =>
	{
		cy.visit('/')
		cy.contains(/WebRTC login/i).click()

		resetWebrtc()
		connectWebrtc().then(walletCb => (

			singleton.jrpc.switchToQueueMode(),
			walletCb(undefined, [{address: '0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0', chainId:4, blockchain:'eth'}])
		))
		
		cy.url().should('match', /\/wallets/)
		cy.contains(/create new tx/i).click()
		fillEthTx()
		
		cy.contains('Continue').click()

		let [json, cb] = await singleton.jrpc.nextMessage() as RequestHandlerTuple<IHCSimple<{tx: IEthTransaction}, { wallet: IWallet }>, string>
		expect(json.method).eq('signTransferTx')
		let [tx, wallet] = Array.isArray(json.params) ? json.params : [json.params.tx, json.params.wallet]
		
		expect(wallet.address.toLowerCase()).eq('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0'.toLowerCase())
		expect(wallet.blockchain).eq('eth')
		expect(wallet.chainId.toString()).eq('4')

		expect(tx.value).eq('45012345000000000000')
		assert.isNumber(tx.nonce)
		expect(tx.gasPrice).match(/^[^0]\d+00000000$/)
		expect(tx.to.toLowerCase()).eq(wallet.address.toLowerCase())
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