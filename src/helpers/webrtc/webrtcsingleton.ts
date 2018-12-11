import { RTCHelper } from './webrtc'
import { JsonRpc } from './jsonrpc'
import { timedPromise } from './promise'

let i = 0

export function init() {
  let rtc = new RTCHelper('webrtc')
  let ii = i++

  let jrpc = new JsonRpc(
    msg => (console.log(`JSONRPC ${ii}: ${msg}`), rtc.dataChannel!.send(msg)),
    (json, cb) => {
      console.log(`ignored remote signer request:`, json)
      cb(undefined, null)
    }
  )

  rtc.onMessage = ev => (console.log(`webrtc jrpc incoming:`, ev), jrpc.onMessage(ev.data.toString()))
  let connected = false

  return {
    rtc,
    jrpc,
    connected,
  }
}
export async function checkConnection(): Promise<boolean> {
  if (!singleton.connected) return false

  try {
    await timedPromise(singleton.jrpc.ping(), 5000)
    return true
  } catch (e) {
    return false
  }
}

let singleton = init()
export let getSingleton = () => singleton

export function reset() {
  singleton = init()
}
