import { call, take, put, cancelled } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

import { WebRTC } from '../services/webrtc'
import { getWalletList } from '../helpers/webrtc'
import { handshakeServerUrl } from '../constants'
import { webrtcConnectionReady, setWebRtcConnectionSid } from '../actions'

const makeOfferRequest = (offer: string) =>
  JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'offer', params: { offer } })

const makeIceRequest = (ice: string) =>
  JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'ice', params: { ice } })

const onOpenChannel = (ws: WebSocket) => eventChannel((emit) => {
  ws.addEventListener('open', emit)
  ws.addEventListener('error', (err) => emit(err))
  return () => ws.removeEventListener('open', emit)
})

const onMessageChannel = (ws: WebSocket) => eventChannel((emit) => {
  ws.addEventListener('message', emit)
  return () => ws.removeEventListener('message', emit)
})

function* answerSaga(ws: WebSocket, rtc: WebRTC, answer: string) {
  const sendIce = (ice: any) => ws.send(makeIceRequest(ice)) // TODO: Add typings
  rtc.candidates.map(sendIce)
  rtc.on('ice', sendIce)

  yield call(rtc.pushAnswer, { type: 'answer', sdp: answer })
  yield call(rtc.waitConnection)
  yield put(webrtcConnectionReady())

  rtc.dataChannel.send(getWalletList())
  return ws.close()
}

export default function* handshakeServerSaga(rtc: WebRTC, offer: { sdp: string }) {
  const ws = new WebSocket(handshakeServerUrl)
  const openChan = onOpenChannel(ws)
  const messageChan = onMessageChannel(ws)

  yield take(openChan)
  ws.send(makeOfferRequest(offer.sdp))

  while (true) try {
    const { data } = yield take(messageChan)
    const { id, method, result, params } = JSON.parse(data.toString())

    if (id === 1) yield put(setWebRtcConnectionSid(result.sid))
    if (method === 'ice') yield call(rtc.pushIceCandidate, params.ice)
    if (method === 'answer') return yield call(answerSaga, ws, rtc, params.answer)
  } catch (err) {
    console.log(err)
  } finally {
    if (yield cancelled()) {
      openChan.close()
      messageChan.close()
      console.log('webrtc connection closed')
    }
  }
}
