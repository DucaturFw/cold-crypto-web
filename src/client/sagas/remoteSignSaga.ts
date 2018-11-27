import { call, put, take, fork, race } from 'redux-saga/effects'
import { eventChannel, delay } from 'redux-saga'

import RTC, { WebRTC } from '../services/webrtc'
// import { uploadFile, downloadFile } from '../helpers/ipfs'

import handshakeServerSaga from './handShakeServerSaga'

import {
  setWebRtcConnectionState,
  setQrAnswer,
  requestJRPC,
  setResponseJRPC,
  setWebRtcConnectionSid,
} from '../actions'

export default function* remoteSignSaga() {
  const rtc = RTC()
  const offer = yield call(rtc.createOffer)

  // Init WebRTC connection
  yield fork(handshakeServerSaga, rtc, offer)

  // Choose method of login based on webrtc connection
  const { qrMethod, webrtcMethod } = yield race({
    qrMethod: delay(3000),
    webrtcMethod: take(setWebRtcConnectionSid),
  })

  if (webrtcMethod)
    console.log('Ready to webrtc connection')

  if (qrMethod)
    console.log('No webrtc connection, use QR login instead')

  // const candidates = rtc.candidates
  // const ipfs = new IPFS()
  // const file = `${offer}\n\n\n---\n\n\n${candidates}`
  // const hash = yield call(uploadFile, file)

  // Notify UI about connection state
  // yield put(setWebRtcConnectionState(hash))

  // Waiting for file hash from QR (UI)
  const { payload: qrAnswer } = yield take(setQrAnswer)

  // Request to download file by hash
  // const answer = yield call(downloadFile, qrAnswer)

  // Push signed key to peers
  yield call(rtc.pushAnswer, qrAnswer /*answer*/)
  yield call(rtc.waitConnection)

  // cataChannel logic
  const jrpcCall = yield call(dataChannelSaga, rtc.dataChannel)

  while (true) {
    // Waiting for UI request to JRPC
    const { payload: { method, data } } = yield take(requestJRPC)
    // Pass request to saga and don't block loop for other requests
    yield fork(jsonRPCCallSaga, jrpcCall, method, data)
  }
}

function* jsonRPCCallSaga<T extends unknown, U extends unknown>(
  jrpcCall: (method: string, data: T) => U,
  method: string,
  data: T,
) {
  const response: U = yield call(jrpcCall, method, data)
  // Notify store and UI about response
  yield put(setResponseJRPC({ method, data, response }))
}

function* dataChannelSaga(dataChannel: RTCDataChannel) {
  let lastMsgId = 0

  const msgChan = eventChannel((emitter) => {
    dataChannel.onmessage = (msg: MessageEvent) => emitter(msg.data)
    return dataChannel.close
  })

  return function*(method: string, params: any) {
    const id = lastMsgId++
    dataChannel.send(JSON.stringify({ id, method, params }))

    while (true) {
      const resp = yield take(msgChan)
      if (resp.id === id) return resp
    }
  }
}
