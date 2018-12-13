import { call, take, put, cancelled, select, race, fork } from 'redux-saga/effects'
import { delay, eventChannel, Channel } from 'redux-saga'

import { parseHostMessage } from '../../helpers/webrtc/hostproto'

import { handshakeServerUrl } from '../../constants'
import { connectionReady, sendCommand, setSender, incomingMessage } from './actions'
import { getWalletListCommand } from '../../helpers/jsonrps'
import { setRtcSid } from '../transport/actions'
import { IApplicationState } from '..'
import { RTCHelper } from '../../helpers/webrtc/webrtc'

const makeOfferRequest = (offer: string) =>
  JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'offer', params: { offer } })

const makeIceRequest = (ice: RTCIceCandidate) =>
  JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'ice', params: { ice } })

const makeRtcLoginRequest = (sid: string) =>
  `webrtcLogin|1|${JSON.stringify({ sid, url: handshakeServerUrl })}`

const onOpenChannel = (ws: WebSocket) =>
  eventChannel(emit => {
    ws.addEventListener('open', emit)
    ws.addEventListener('error', err => emit(err))
    return () => ws.removeEventListener('open', emit)
  })

const onWsMessageChannel = (ws: WebSocket) =>
  eventChannel(emit => {
    ws.addEventListener('message', emit)
    return () => ws.removeEventListener('message', emit)
  }) as Channel<MessageEvent>

const onRtcConnectFailedChannel = (rtc: RTCHelper) =>
  eventChannel(emit => {
    rtc.on('error', err => emit(err))
    rtc.on('close', err => emit(err))
    return () => false
  })

const onRtcConnectedChannel = (rtc: RTCHelper) =>
  eventChannel(emit => {
    rtc.on('connected', err => emit(err))
    return () => false
  })

const onRtcMessageChannel = (rtc: RTCHelper) =>
  eventChannel(emit => {
    rtc.on('msg', err => emit(err))
    return () => false
  }) as Channel<MessageEvent>

function* answerSaga(ws: WebSocket, rtc: RTCHelper, answer: string) {
  const sendIce = (ice: RTCIceCandidate) => ws.send(makeIceRequest(ice)) // TODO: Add typings
  rtc.candidates.map(sendIce)
  rtc.on('ice', sendIce)
  yield call(rtc.pushAnswer, { type: 'answer' as RTCSdpType, sdp: answer })
  yield call(rtc.waitConnection)
  yield put(connectionReady())
  return ws.close()
}

function* timeoutOnWsAnswer(wsMessageChan: Channel<MessageEvent>) {
  while (true) {
    const { data } = yield take(wsMessageChan)
    const { method } = JSON.parse(data.toString())
    if (method === 'answer')
      return yield delay(7000)
  }
}

function* wrapRtcMessages(rtcMessageChan: Channel<MessageEvent>) {
  while (true) {
    const { data } = yield take(rtcMessageChan)
    yield put(incomingMessage(parseHostMessage(data))) // TODO: Check format? Add typings!
  }
}

function* proxyIncomingFallbackToRtc(wsMessageChan: Channel<MessageEvent>) {
  while (true) {
    const { data } = yield take(wsMessageChan)
    const { params } = JSON.parse(data.toString())
    yield put(incomingMessage({ method: 'fallback', params: { msg: params } }))
  }
}

function* proxyFallbackMessagesToWs(rtcMessageChan: Channel<MessageEvent>, ws: WebSocket) {
  while (true) {
    const { payload } = yield take(rtcMessageChan)

    ws.send(JSON.stringify({
      jsonrpc: '2.0',
      id: 789,
      method: 'fallback',
      params: { msg: payload }
    }))
  }
}

function* watchForIncomingMessagesSaga(rtc: RTCHelper, ws: WebSocket) {
  while (true) try {
    const { payload } = yield take(incomingMessage)
    const { id, method, result, params } = payload

    if (id === 1)
      yield put(setRtcSid(makeRtcLoginRequest(result.sid)))

    if (method === 'ice')
      yield call(rtc.pushIceCandidate, params.ice)

    if (method === 'answer')
      return yield call(answerSaga, ws, rtc, params.answer)

  } catch (err) {
    console.log(err)
    return err
  } finally {
    if (yield cancelled()) {
      yield put(sendCommand(getWalletListCommand()))
    }
  }
}

export default function* connectSaga() {
  // TODO: eject webrtc instance from redux store, pass it directly
  const rtc = yield select((state: IApplicationState) => state.webrtc.rtc)
  const offerPromise = yield call(rtc.createOffer)
  const ws = new WebSocket(handshakeServerUrl)
  const openChan = onOpenChannel(ws)

  // Waiting for WS, we can't work without this critical connection
  // TODO: change flow to offline qr codes?
  yield take(openChan)

  ws.send(makeOfferRequest(offerPromise.sdp))

  const rtcConnectedChan = onRtcConnectedChannel(rtc)
  const rtcConnectFailedChan = onRtcConnectFailedChannel(rtc)
  const rtcMessageChan = onRtcMessageChannel(rtc)
  const wsMessageChan = onWsMessageChannel(ws)

  const [ rtcConnected ] = yield race([
    take(rtcConnectedChan),
    take(rtcConnectFailedChan),
    call(timeoutOnWsAnswer, wsMessageChan)
  ] as any /* TODO: update types of redux-saga */)

  yield fork(wrapRtcMessages, rtcMessageChan)

  if (!rtcConnected) {
    yield fork(proxyFallbackMessagesToWs, rtcMessageChan, ws)
    yield fork(proxyIncomingFallbackToRtc, wsMessageChan)
  }

  // yield fork(watchForWsClose(ws)) TODO: implement for catch future disconnections

  // Waiting for end of messages loop
  yield call(watchForIncomingMessagesSaga, rtc, ws)

  openChan.close()
  wsMessageChan.close()
  // TODO: close over channels
  console.log('ws connection closed')
}
