import { JsonRpc } from "../../src/helpers/webrtc/jsonrpc"
import { singleton as webrtc } from "../../src/helpers/webrtc/webrtcsingleton"

import { checkWebrtcQr } from "./interact_qr"

export async function connectWebrtc()
{
	let { sid, url } = await checkWebrtcQr()
	let ws = new WebSocket(url)
	let ice = [] as any[]
	
	let jrpc = new JsonRpc(msg => (/* console.log('OUT>',msg), */ws.send(msg)), (json, cb) =>
	{
		// console.log('<IN', json)
		expect(json.method).eq('ice')
		let [cand] = Array.isArray(json.params) ? json.params : [json.params.ice]
		ice ? ice.push(cand) : webrtc.rtc.pushIceCandidate(cand)
	})
	ws.addEventListener('message', ev => jrpc.onMessage(ev.data.toString()))
	ws.addEventListener('open', async () =>
	{
		let result = await jrpc.callRaw("join", { sid }) as { offer: string}
		// console.log(result)
		let offer = result.offer
		// console.log(offer)
		assert.isString(offer)
		// console.log('#### 1')
		let answer = await webrtc.rtc.pushOffer({ sdp: offer, type: "offer" })
		// console.log('#### 2')
		jrpc.callRaw("answer", { answer: answer.sdp })
		// console.log('#### 3')
		//@ts-ignore
		webrtc.rtc.on('ice', cand => jrpc.callRaw('ice', { ice: cand }))
		// console.log('#### 4')
		await Promise.all(webrtc.rtc.candidates.map(ice => jrpc.callRaw('ice', { ice })))
		// console.log('#### 5')
		let iice = ice
		// console.log('#### 6')
		ice = undefined as any
		// console.log('#### 7')
		await Promise.all(iice.map(cand => webrtc.rtc.pushIceCandidate(cand)))
		// console.log('#### 8')
	})
	let gotRequest = new Promise((res, rej) =>
	{
		webrtc.jrpc.onRequest = (json, cb) =>
		{
			// console.log(`$request`, json)
			expect(json.method).eq("getWalletList")
			if (Array.isArray(json.params))
				expect(json.params).eql([['eth','eos']])
			else
				expect(json.params).eql({blockchains:['eth','eos']})
			
			res()
		}
	})
	// console.log("^^^ 1")
	await webrtc.rtc.waitConnection()
	// console.log("^^^ 2")
	await gotRequest
	// console.log("^^^ 3")
}