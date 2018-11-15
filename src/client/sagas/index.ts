import { all, fork } from 'redux-saga/effects'

import blockchains from './blockchainsSaga'
import webRtc from './webrtcSaga'

export default function* rootSaga() {
  yield all([
    fork(blockchains),
    fork(webRtc),
  ])
}
