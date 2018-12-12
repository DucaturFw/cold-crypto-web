import { fork, all, take, select, call, put, takeEvery, cancel } from 'redux-saga/effects'
import { eventChannel, delay } from 'redux-saga'

import connectTask from './connectSaga'
import parseMessage from '../../utils/parseMessage'
import { RTCCommands } from '../../constants'
import { login, sendTransaction } from '../transport/actions'
import { WebrtcActionTypes } from './types'
import { IApplicationState } from '..'
import { setStatus, connectionClosing, sendCommand } from './actions'
import { call as prepareCall } from '../../helpers/webrtc/jsonrpc'
import { push } from 'connected-react-router';
import { setSendingTxData } from '../wallets/actions';
import { IHostCommand } from '../../helpers/webrtc/hostproto'
import { RTCHelper } from '../../helpers/webrtc/webrtc';

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
      case RTCCommands.signContractCall:
        yield put(setStatus('Sending'))
        yield put(sendTransaction(message))
        break
      default:
        break
    }
  }
}

function* handleOpeningConnection() {
  const [rtc, msg] = (yield select((state: IApplicationState) => [state.webrtc.rtc, state.transport.lastWebrtcMsg])) as [RTCHelper, IHostCommand<unknown[], unknown>]
  if (msg)
    yield put(sendCommand(msg))

  while (true) {
    yield delay(3000)
    if (rtc.dataChannel!.readyState === 'closing') yield put(connectionClosing())
  }
}

function* handleSendCommand(action: ReturnType<typeof sendCommand>) {
  const { webrtc: {connected, send}, wallets:{item: wallet} } = yield select((state: IApplicationState) => state)
  try
  {  
    let msg = prepareCall(action.payload.method, action.payload.id, action.payload.params, true)
    
    yield put(setSendingTxData({ command: action.payload, error: '', hash: '' }))
    yield put(setStatus('Verification'))

    if(connected) {
      yield call(send, msg)
      yield put(push('/status'))
    } else {
      yield put(push(`/wallets/${wallet.address}/tx/sign`))
    }
    
  } catch (error)
  {
    console.error(error)  
  }
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
