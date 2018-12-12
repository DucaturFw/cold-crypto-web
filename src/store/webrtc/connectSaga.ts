import { call, take, put, cancelled, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

import { handshakeServerUrl } from '../../constants'
import { connectionReady, sendCommand, setSender } from './actions'
import { getWalletListCommand } from '../../helpers/jsonrps'
import { setRtcSid } from '../transport/actions'
import { IApplicationState } from '..'
import { RTCHelper } from '../../helpers/webrtc/webrtc'

const makeOfferRequest = (offer: string) =>
  JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'offer', params: { offer } })

const makeIceRequest = (ice: RTCIceCandidate) =>
  JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'ice', params: { ice } })

const onOpenChannel = (ws: WebSocket) =>
  eventChannel(emit => {
    ws.addEventListener('open', emit)
    ws.addEventListener('error', err => emit(err))
    return () => ws.removeEventListener('open', emit)
  })

const onMessageChannel = (ws: WebSocket) =>
  eventChannel(emit => {
    ws.addEventListener('message', emit)
    return () => ws.removeEventListener('message', emit)
  })

function* answerSaga(ws: WebSocket, rtc: RTCHelper, answer: string) {
  const sendIce = (ice: RTCIceCandidate) => ws.send(makeIceRequest(ice)) // TODO: Add typings
  rtc.candidates.map(sendIce)
  rtc.on('ice', sendIce)
  yield call(rtc.pushAnswer, { type: 'answer' as RTCSdpType, sdp: answer })
  yield call(rtc.waitConnection)
  yield put(connectionReady())
  return ws.close()
}

export default function* connectSaga() {
  const rtc = yield select((state: IApplicationState) => state.webrtc.rtc)
  const offerPromise = yield call(rtc.createOffer)
  const ws = new WebSocket(handshakeServerUrl)
  const openChan = onOpenChannel(ws)
  const messageChan = onMessageChannel(ws)
  yield take(openChan)

  ws.send(makeOfferRequest(offerPromise.sdp))

  yield put(setSender((data) => ws.send((console.log(`DATATATATT`, data), JSON.stringify({
    jsonrpc: '2.0',
    id: 789,
    method: 'fallback',
    params: { msg: data }
  })))))

  while (true)
    try {
      const { data } = yield take(messageChan)
      const { id, method, result, params } = JSON.parse(data.toString())

      if (id === 1) yield put(setRtcSid(webrtcLogin(result.sid)))
      if (method === 'ice') yield call(rtc.pushIceCandidate, params.ice)
      if (method === 'answer')
        return yield call(answerSaga, ws, rtc, params.answer)
    } catch (err) {
      console.log(err)
    } finally {
      if (yield cancelled()) {
        openChan.close()
        messageChan.close()
        console.log('ws connection closed')
        yield put(sendCommand(getWalletListCommand()))
      }
    }
}

export const webrtcLogin = (sid: string) => {
  const params = { sid, url: handshakeServerUrl }

  return `webrtcLogin|1|${JSON.stringify(params)}`
}
