import { all, fork } from 'redux-saga/effects'

import blockchains from './blockchainsSaga'
import webRtc from './webrtcSaga'
import routerSaga from './routerSaga'

export default function* rootSaga() {
  yield all([
    fork(blockchains),
    fork(webRtc),
    fork(routerSaga),
  ])
}
