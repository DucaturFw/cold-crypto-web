import { all, fork } from 'redux-saga/effects'

import blockchainsSaga from './blockchainsSaga'
import routerSaga from './routerSaga'
import walletsSaga from './walletsSaga'
import webRtcSaga from './webrtcSaga'

export default function* rootSaga() {
  yield all([
    fork(routerSaga),
    fork(blockchainsSaga),
    fork(walletsSaga),
    fork(webRtcSaga),
  ])
}
