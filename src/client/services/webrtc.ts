import { EventEmitter } from 'events'

export class WebRTC extends EventEmitter {
  public rpc = new RTCPeerConnection()
  public candidates: RTCIceCandidate[] = []
  public dataChannel?: RTCDataChannel
  public offer?: RTCSessionDescriptionInit
  public connected = false
  public tag = ''

  constructor(public name?: string) {
    super()

    if (name) this.tag = `[${name}] `
    this.rpc.onicecandidate = this.onIceCandidate
    this.rpc.ondatachannel = this.onDataChannel
    return this
  }
  public onIceCandidate = (ev: RTCPeerConnectionIceEvent) => {
    console.log(`${this.tag}onIceCandidate: ${JSON.stringify(ev.candidate)}`)
    if (ev.candidate)
      this.candidates.push(ev.candidate)

    this.emit('ice', ev.candidate)
  }
  public onDataChannel = (ev: RTCDataChannelEvent) => {
    console.log(`${this.tag}onDataChannel: ${JSON.stringify(ev.channel)}`)
    this.setChannel(ev.channel)
  }
  public onDataChannelOpen = (ev: Event) => {
    console.log(`${this.tag}onDataChannelOpen: ${ev.type}`)
    this.connected = true
    this.emit('connected')
  }
  public onMessage = (ev: MessageEvent) => {
    console.log(`${this.tag}${ev.type}: ${ev.data}`)
  }
  public setChannel(c: RTCDataChannel) {
    this.dataChannel = c
    this.dataChannel.onopen = this.onDataChannelOpen
    this.dataChannel.onmessage = this.onMessage
  }
  public waitConnection = async (): Promise<void> => {
    if (this.connected)
      return Promise.resolve()

    return new Promise<void>((res, rej) => this.on('connected', () => res()))
  }
  public createOffer = async (): Promise<RTCSessionDescriptionInit> => {
    console.log(`${this.tag}createOffer`)
    this.setChannel(this.rpc.createDataChannel('chat'))
    this.offer = await this.rpc.createOffer()
    await this.rpc.setLocalDescription(this.offer)
    return this.offer
  }
  public async pushOffer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
    console.log(`${this.tag}pushOffer: ${JSON.stringify(offer)}`)
    if (this.offer)
      throw new Error('can\'t push offer to already inited rtc connection!')

    await this.rpc.setRemoteDescription(offer)
    const answer = await this.rpc.createAnswer()
    await this.rpc.setLocalDescription(answer)
    return answer
  }
  public pushAnswer = async (answer: RTCSessionDescriptionInit) => {
    console.log(`${this.tag}pushAnswer: ${JSON.stringify(answer)}`)
    await this.rpc.setRemoteDescription(answer)
  }
  public async pushIceCandidate(candidate: RTCIceCandidateInit | RTCIceCandidate) {
    await this.rpc.addIceCandidate(candidate)
  }
}

export class JsonRpcOverWebRtc
{
  public dataChannel: RTCDataChannel

  lastOutgoingMsgId: number = 0

  listeners: { [id: number]: (err: any, json: any) => void } = { }

  constructor(dataChannel: RTCDataChannel)
  {
    this.dataChannel = dataChannel
    this.dataChannel.onmessage = this.onMessage
  }
  onMessage = (msg: MessageEvent) =>
  {
    let data = msg.data ? msg.data.toString() : ''
    let json = JSON.parse(data)
    // console.log(json)
    let id = json.id
    if (this.listeners[id])
    {
      let m = this.listeners[id]
      delete this.listeners[id]
      m(json.error, json.result)
    }
  }
  public async ping()
  {
    let response = await this.call("ping")
    if (response != "pong")
      throw "JSON-RPC over WebRTC: unknown ping error!"
  }
  public async call(method: string, ...args): Promise<any>
  {
    return new Promise((res, rej) =>
    {
      let id = this.getNextMsgId()
      this.listeners[id] = (err, msg) => err ? rej(err) : res(msg)
      this.dataChannel.send(JSON.stringify({ id, method, params: args }))
    })
  }
  getNextMsgId()
  {
    return this.lastOutgoingMsgId++
  }
}

let wrtc: WebRTC

export default () => (wrtc || (wrtc = new WebRTC()))
