import { call, put, take } from 'redux-saga/effects'
import WebRtcDataChannel from 'webrtc-datachannel'

import { setWebRtcQrRequest, setWebRtcQrAnswer } from './actions'

export default function* dataChannelSaga() {
  const rtc = new WebRtcDataChannel({
    connection: {
      iceServers: [
        { urls: [ 'stun:stun.l.google.com:19302' ] }
      ]
    }
  })

  const request = yield call(rtc.initiateConnect)
  yield put(setWebRtcQrRequest(request))
  const answer = yield take(setWebRtcQrAnswer)
  yield call(rtc.setAnswer, answer)

  yield call(rtc.send, { request: 'hello' })
}