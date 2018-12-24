import { fork } from 'redux-saga/effects'

import dataChannelSaga from './dataChannelSaga'

function* webrtcSaga() {
  yield fork(dataChannelSaga)
}

export default webrtcSaga
