import { parseHostMessage, IHCSimple } from "../../src/helpers/webrtc/hostproto"
import { reset as resetWebrtc, getSingleton as getWebrtc } from "../../src/helpers/webrtc/webrtcsingleton"
import { RequestHandlerTuple } from "../../src/helpers/webrtc/jsonrpc"
import { connectWebrtc } from "./interact_webrtc"
import { showQr, checkShownQr } from "./interact_qr"

describe('tx generation', () =>
{
	function fillTx(address: string, amount: string)
	{
		cy.url().should('include', '/tx/create')
		cy.contains('To:').next('input').type(address)
		cy.contains('Enter amount:').next('div').children('strong').children('input').as('eosvalinput')
		cy.get('@eosvalinput').first().type(amount)
		cy.get('@eosvalinput').last().its('attr').should((attr) => parseInt(attr('value') + "").toString() == attr('value'))
	}
	it('should open tx creation window', () =>
	{
		cy.visit('/login')

		showQr('video', 'login_single_eth_wallet')
		cy.contains(/create new tx/i).click()

		fillTx('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0', '45.012345')

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
		fillTx('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0', '45.012345')
		cy.contains('Continue').click()

		let qr = await checkShownQr(/^signTransferTx\|\d+\|.+$/)
		let msg = parseHostMessage(qr) as IHCSimple<{ tx: IEthTransaction }, { wallet: IWallet }>
		assert(msg, `host message is not defined`)
		expect(msg.method).eq('signTransferTx')
		assert(msg.params, `host message params are not defined`)
		let [tx, wallet] = Array.isArray(msg.params) ? msg.params : [msg.params.tx, msg.params.wallet]
		
		expect(wallet.address.toLowerCase()).eq('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0'.toLowerCase())
		expect(wallet.blockchain).eq('eth')
		expect(wallet.chainId.toString()).eq('4')

		expect(tx.value).eq('45012345000000000000')
		assert.isNumber(tx.nonce)
		expect(tx.gasPrice).match(/^[^0]\d+00000000$/)
		expect(tx.to.toLowerCase()).eq(wallet.address.toLowerCase())
	})
	it('should not work without form values', async () =>
	{
		cy.visit('/login')

		showQr('video', 'login_single_eth_wallet')
		cy.contains(/create new tx/i).click()
		cy.contains('Continue').should('be.disabled')
	})
	it('should not work with incorrect eth address', async () =>
	{
		cy.visit('/login')

		showQr('video', 'login_single_eth_wallet')
		cy.contains(/create new tx/i).click()
		fillTx('zzz', '0')
		cy.contains('Continue').should('be.disabled')
	})
	it('should not work with incorrect eth value', async () =>
	{
		cy.visit('/login')

		showQr('video', 'login_single_eth_wallet')
		cy.contains(/create new tx/i).click()
		fillTx('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0', 'uuu')
		cy.contains('Continue').should('be.disabled')
	})
	it('short', async () =>
	{
		resetWebrtc()
		getWebrtc().jrpc.switchToQueueMode()

		cy.visit('/')
		cy.contains(/WebRTC login/i).click()
		cy.url().should('contain', '/login')
	})
	it('should generate webrtc tx', async () =>
	{
		resetWebrtc()
		let webrtc = getWebrtc()
		webrtc.jrpc.switchToQueueMode()

		cy.visit('/')
		cy.contains(/WebRTC login/i).click()
		cy.url().should('contain', '/login')

		// console.log('((( 1')
		connectWebrtc().then(walletCb => walletCb(undefined, [{address: '0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0', chainId:4, blockchain:'eth'}]))
		// console.log('((( 2')
		// console.log('((( 3')
		
		cy.url().should('match', /\/wallets/)
		// console.log('((( 4')
		cy.contains(/create new tx/i).click()
		// console.log('((( 5')
		fillTx('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0', '45.012345')
		// console.log('((( 6')
		
		cy.contains('Continue').click()
		// console.log('((( 7')
		
		let [json, cb] = await webrtc.jrpc.nextMessage() as RequestHandlerTuple<IHCSimple<{tx: IEthTransaction}, { wallet: IWallet }>, string>
		// console.log('((( 8')
		expect(json.method).eq('signTransferTx')
		// console.log('((( 9')
		let [tx, wallet] = Array.isArray(json.params) ? json.params : [json.params.tx, json.params.wallet]
		// console.log('((( 10')
		
		expect(wallet.address.toLowerCase()).eq('0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0'.toLowerCase())
		// console.log('((( 11')
		expect(wallet.blockchain).eq('eth')
		// console.log('((( 12')
		expect(wallet.chainId.toString()).eq('4')
		// console.log('((( 13')

		expect(tx.value).eq('45012345000000000000')
		assert.isNumber(tx.nonce)
		expect(tx.gasPrice).match(/^[^0]\d+00000000$/)
		expect(tx.to.toLowerCase()).eq(wallet.address.toLowerCase())
	})
})