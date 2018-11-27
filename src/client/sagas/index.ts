import { all, fork } from 'redux-saga/effects'

import blockchainsSaga from './blockchainsSaga'
import remoteSignSaga from './remoteSignSaga'
import routerSaga from './routerSaga'
import walletsSaga from './walletsSaga'
import webRtcSaga from './webrtcSaga'
import handShakeServerSaga from './handShakeServerSaga'

export default function* rootSaga() {
  yield fork(routerSaga)

  yield all([
    fork(blockchainsSaga),
    fork(remoteSignSaga),
    fork(walletsSaga),
    fork(webRtcSaga),
    fork(handShakeServerSaga),
  ])
}
