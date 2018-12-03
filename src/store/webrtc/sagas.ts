import { fork, all, take, cancel, select, call, put } from 'redux-saga/effects'
import { eventChannel, takeEvery } from 'redux-saga'

import connectTask from './connectSaga'
import parseMessage from '../../utils/parseMessage'
import { RTCCommands } from '../../constants'
import { login, sendTransaction } from '../transport/actions'
import { WebrtcActionTypes } from './types'
import { IApplicationState } from '..'

function createDataChannel(dataChannel: any) {
  return eventChannel(emit => {
    dataChannel.onmessage = (message: any) => emit(message.data)

    const unsubscribe = () => {
      dataChannel.close()
    }

    return unsubscribe
  })
}

function* watchDataChannel() {
  const rtc = yield select((state: IApplicationState) => state.webrtc.rtc)
  const channelMessage = yield call(createDataChannel, rtc.dataChannel)

  while (true) {
    const message = yield take(channelMessage)
    const { id } = parseMessage(message)
    switch (id) {
      case RTCCommands.getWalletList:
        yield put(login(message))
        break
      case RTCCommands.signTransferTx:
        yield put(sendTransaction(message))
        break
      default:
        break
    }

    // TODO: make pong for datachenel
  }
}

function* watchConnection() {
  const bgConectionTask = yield fork(connectTask)

  yield takeEvery(WebrtcActionTypes.CONNECTION_SUCCESS, function*() {
    yield cancel(bgConectionTask)
  })
}

function* webrtcSaga() {
  yield all([fork(watchConnection), fork(watchDataChannel)])
}

export default webrtcSaga
