import { EventEmitter } from "events"

export class RTCHelper extends EventEmitter
{
	rpc = new RTCPeerConnection()
	candidates: RTCIceCandidate[] = []
	dataChannel?: RTCDataChannel
	offer?: RTCSessionDescriptionInit
	connected = false
	tag = ""
	
	constructor(public name?: string)
	{
		super()

		if (name)
			this.tag = `[${name}] `

		this.rpc.onicecandidate = this.onIceCandidate
		this.rpc.ondatachannel = this.onDataChannel
	}
	onIceCandidate = (ev: RTCPeerConnectionIceEvent) =>
	{
		console.log(`${this.tag}onIceCandidate: ${JSON.stringify(ev.candidate)}`)
		if (ev.candidate)
			this.candidates.push(ev.candidate)
	}
	onDataChannel = (ev: RTCDataChannelEvent) =>
	{
		console.log(`${this.tag}onDataChannel: ${JSON.stringify(ev.channel)}`)
		this.setChannel(ev.channel)
	}
	onDataChannelOpen = (ev: Event) =>
	{
		console.log(`${this.tag}onDataChannelOpen: ${ev.type}`)
		this.connected = true
		this.emit('connected')
	}
	onMessage = (ev: MessageEvent) =>
	{
		console.log(`${this.tag}${ev.type}: ${ev.data}`)
	}
	setChannel(c: RTCDataChannel)
	{
		this.dataChannel = c
		this.dataChannel.onopen = this.onDataChannelOpen
		this.dataChannel.onmessage = this.onMessage
	}
	async waitConnection(): Promise<void>
	{
		if (this.connected)
			return Promise.resolve()
		
		return new Promise<void>((res, rej) => this.on('connected', () => res()))
	}
	async createOffer(): Promise<RTCSessionDescriptionInit>
	{
		console.log(`${this.tag}createOffer`)
		this.setChannel(this.rpc.createDataChannel("chat"))
		this.offer = await this.rpc.createOffer()
		await this.rpc.setLocalDescription(this.offer)
		return this.offer
	}
	async pushOffer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit>
	{
		console.log(`${this.tag}pushOffer: ${JSON.stringify(offer)}`)
		if (this.offer)
			throw "can't push offer to already inited rtc connection!"
		
		await this.rpc.setRemoteDescription(offer)
		let answer = await this.rpc.createAnswer()
		await this.rpc.setLocalDescription(answer)
		return answer
	}
	async pushAnswer(answer: RTCSessionDescriptionInit)
	{
		console.log(`${this.tag}pushAnswer: ${JSON.stringify(answer)}`)
		await this.rpc.setRemoteDescription(answer)
	}
	async pushIceCandidate(candidate: RTCIceCandidateInit | RTCIceCandidate)
	{
		await this.rpc.addIceCandidate(candidate)
	}
}