import { call, put, take, fork } from 'redux-saga/effects'
import { eventChannel, delay } from 'redux-saga'

import { WebRTC } from '../services/webrtc'
// import { uploadFile, downloadFile } from '../helpers/ipfs'

import {
  setWebRtcConnectionState,
  setQrAnswer,
  requestJRPC,
  setResponseJRPC,
} from '../actions'

export default function* remoteSignSaga() {
  const rtc = new WebRTC()
  const offer = yield call(rtc.createOffer)
  console.log({ offer })
  yield delay(5000)
  const candidates = rtc.candidates
  console.log({ candidates })

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

function* jsonRPCCallSaga(jrpcCall, method, data) {
  const response = yield call(jrpcCall, method, data)
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
