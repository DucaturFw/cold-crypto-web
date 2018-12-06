import jsqr from "jsqr"
import { parseHostMessage, IHCSimple } from "../../src/helpers/webrtc/hostproto"

export function showQr(elemSelector: string, qrName: string)
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
	cy.wait(800)
}
export async function getQrData(elem: JQuery<HTMLElement>): Promise<string>
{
	return new Promise<string>((res, rej) =>
	{
		let svg = elem.toArray()[0] as unknown as SVGSVGElement
		assert(svg, `getQrData(): svg should be present`)
	
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
			assert(qr, `getQrData(): qr should be defined`)
			// console.log(qr)
			res(qr!.data)
		}
		cy.wait(50)
		loader.src = 'data:image/svg+xml,' + encodeURIComponent(new XMLSerializer().serializeToString(svg))
		cy.wait(50)
	})
}
export function checkShownQr(text: string | RegExp): Promise<string>
{
	return new Promise((res, rej) =>
	{
		cy.get('svg').then(async (elem) =>	
		{
			let qr = await getQrData(elem)
			console.log(`qr: ${qr}`)
			if (typeof text === "string")
				if (qr != text)
					return rej(`incorrect qr! expected: "${text}", got: "${qr}"`)
			else
				if (!qr.match(text))
					return rej(`incorrect qr! expected: to match "${text}", got: "${qr}"`)
			
			res(qr)
		})
	})
}
export async function checkWebrtcQr()
{
	cy.get('video').should('not.exist')

	let qr = await checkShownQr(/^webrtcLogin\|\d\|.*$/)
	cy.get('video').should('not.exist')
	let msg = parseHostMessage(qr) as IHCSimple<{sid: string}, { url: string }>
	assert(msg, `checkWebrtcQr(): qr message should be defined`)
	expect(msg.method).eq('webrtcLogin')
	expect(msg.id).match(/\d+/)
	assert(msg.params, `checkWebrtcQr(): qr msg params are not defined!`)
	let [sid, url] = Array.isArray(msg.params) ? msg.params : [msg.params.sid, msg.params.url]
	expect(sid).match(/^session0\.\d+$/)
	expect(url).eq('wss://duxi.io/shake')
	return { sid, url }
}