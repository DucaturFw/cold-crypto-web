import { fork, all, take, cancel, select, call, put } from 'redux-saga/effects'
import { eventChannel, takeEvery, delay } from 'redux-saga'

import connectTask from './connectSaga'
import parseMessage from '../../utils/parseMessage'
import { RTCCommands } from '../../constants'
import { login, sendTransaction } from '../transport/actions'
import { WebrtcActionTypes } from './types'
import { IApplicationState } from '..'
import { setStatus, connectionClosing, sendCommand } from './actions'
import { RTCHelper } from '../../helpers/webrtc/webrtc'
import { call as prepareCall } from '../../helpers/webrtc/jsonrpc'

function createDataChannel(dataChannel: RTCDataChannel) {
  return eventChannel(emit => {
    dataChannel.onmessage = (message: MessageEvent) => emit(message.data)

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
        yield put(setStatus('Sending'))
        yield put(sendTransaction(message))
        break
      default:
        break
    }
  }
}

function* handleOpeningConnection() {
  const rtc = yield select((state: IApplicationState) => state.webrtc.rtc)

  while (true) {
    yield delay(3000)
    if (rtc.dataChannel.readyState === 'closing') yield put(connectionClosing())
  }
}

function* handleSendCommand(action: ReturnType<typeof sendCommand>) {
  const rtc = (yield select(
    (state: IApplicationState) => state.webrtc.rtc
  )) as RTCHelper
  let msg = prepareCall(
    action.payload.method,
    action.payload.id,
    action.payload.params,
    true
  )
  yield call((msg: string) => rtc.dataChannel!.send(msg), msg)
}

function* watchActions() {
  yield takeEvery(WebrtcActionTypes.CONNECTION_OPEN, handleOpeningConnection)
  yield takeEvery(WebrtcActionTypes.SEND_COMMAND, handleSendCommand)
}

function* watchConnection() {
  const bgConectionTask = yield fork(connectTask)

  // dispose connection task
  yield takeEvery(WebrtcActionTypes.CONNECTION_OPEN, function*() {
    yield cancel(bgConectionTask)
  })
}

function* webrtcSaga() {
  yield all([fork(watchConnection), fork(watchDataChannel), fork(watchActions)])
}

export default webrtcSaga
