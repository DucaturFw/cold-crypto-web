import jsqr from "jsqr"

import { parseHostMessage, IHCSimple, IHostResult, allToObj } from "../../src/helpers/webrtc/hostproto"
import { JsonRpc } from "../../src/helpers/webrtc/jsonrpc"
import { singleton as webrtc } from "../../src/helpers/webrtc/webrtcsingleton"

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
	function getQrData(elem: JQuery<HTMLElement>): Promise<string>
	{
		return new Promise((res, rej) =>
		{
			let svg = elem[0] as unknown as SVGSVGElement
		
			let canvas = document.createElement('canvas')
			
			let ctx = canvas.getContext('2d')!
			let loader = new Image()
			loader.width = canvas.width = 200
			loader.height = canvas.height = 200
			loader.onload = () =>
			{
				ctx.drawImage(loader, 0, 0, loader.width, loader.height)
				let data = ctx.getImageData(0, 0, canvas.width, canvas.height)
				let qr = jsqr(data.data, data.width, data.height)
				expect(qr).not.null
				// console.log(qr)
				res(qr!.data)
			}
			loader.src = 'data:image/svg+xml,' + encodeURIComponent(new XMLSerializer().serializeToString(svg))
		})
	}
	function checkShownQr(text: string | RegExp): Promise<string>
	{
		return new Promise((res, rej) =>
		{
			cy.get('svg').should(async (elem) =>
			{
				let qr = await getQrData(elem)
				console.log(`qr: ${qr}`)
				if (typeof text === "string")
					expect(qr).eq(text)
				else
					expect(qr).match(text)
				
				res(qr)
			})
		})
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

	async function checkWebrtcQr()
	{
		cy.get('video').should('not.exist')

		let qr = await checkShownQr(/^webrtcLogin\|\d\|.*$/)
		let msg = parseHostMessage(qr) as IHCSimple<{sid: string}, { url: string }>
		expect(msg.method).eq('webrtcLogin')
		expect(msg.id).match(/\d+/)
		expect(msg.params).not.null
		let [sid, url] = Array.isArray(msg.params) ? msg.params : [msg.params.sid, msg.params.url]
		expect(sid).match(/^session0\.\d+$/)
		expect(url).eq('wss://duxi.io/shake')
		return { sid, url }
	}
	it('should open webrtc login page', async () =>
	{
		cy.visit('/')
		// cy.contains('WebRTC login').click()
		cy.contains(/WebRTC login/i).click()

		cy.url().should('match', /[\/webrtc|\/login\?rtc=true]/)

		await checkWebrtcQr()
	})
	it('should navigate directly to webrtc login page', async () =>
	{
		cy.visit('/login?webrtc=true')

		await checkWebrtcQr()
	})

	async function connectWebrtc()
	{
		let { sid, url } = await checkWebrtcQr()
		let ws = new WebSocket(url)
		let ice = [] as any[]
		
		let jrpc = new JsonRpc(msg => ws.send(msg), (json, cb) =>
		{
			expect(json.method).eq('ice')
			let cand = allToObj(json, ["ice"]).ice
			ice.push(cand)
		})
		ws.addEventListener('message', ev => jrpc.onMessage(ev.data.toString()))
		ws.addEventListener('open', async () =>
		{
			let offer = await jrpc.callRaw("join", { sid }) as IHostResult<string>
			assert.isString(offer.result)
			let answer = await webrtc.rtc.pushOffer({ sdp: offer.result, type: "offer" })
			await jrpc.callRaw("answer", { answer })
			webrtc.rtc.candidates.map(ice => jrpc.callRaw('ice', { ice }))
		})
		return webrtc.rtc.waitConnection()
	}
	it('should connect webrtc', async () =>
	{
		cy.visit('/')
		cy.contains(/WebRTC login/i).click()
		
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