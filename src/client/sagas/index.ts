import { navigate } from 'fuse-react'
import { eventChannel } from 'redux-saga'
import { call, put, take, takeEvery, all, select } from 'redux-saga/effects'
import { parseMessage } from '../helpers/json'
import { getNonce, sendTx } from '../services/ethHelper'
import { addWallets, scanWallets, scanTransaction, initWebrtcConnaction, webrtcMessageReceived, setLastTransaction, startSendingTx } from '../actions'
import { RTCCommands } from '../constants' 

function* createEventChannel(rtc) {
  return eventChannel((emit) => {
    rtc.dataChannel.onmessage = ((message) => {
      return emit(message.data)
    })

    return () => {
      rtc.close()
    }
  })
}

function* initializeWebrtcChannel() {
  const { webrtc } = yield select((state: any) => state.webrtc)
  const channel = yield call(createEventChannel, webrtc);
  while (true) {
    const message = yield take(channel)
    console.log(message)
    yield put(webrtcMessageReceived(message))
  }
}

function* setWallet(wallet) {
  const wallets = yield wallet.map((item) => {
    return getNonce(item.address).then((resolve) => {
      return { ...item, nonce: resolve }
    })
  })

  yield put(addWallets(wallets))
  navigate('/wallets')
}

function* webrtcListener(action) {
  const data = parseMessage(action.payload)

  switch (data.id) {
    case RTCCommands.getWalletList:
      yield setWallet(data.result)
      break
    case RTCCommands.signTransferTx: 
      yield put(scanTransaction(data.result))
      break
    default:
      break
  }
}

function* scanTx(action) {
  if (action.payload instanceof Error) return


  try {
    yield put(startSendingTx(true))
    const transactionHash = yield sendTx(action.payload)

    yield put(setLastTransaction(transactionHash))
  } catch (error) {
    yield put(setLastTransaction(error))
  }
  yield put(startSendingTx(false))
  navigate(`/tx`)
}

function* complementWallets(action) {
  // TODO: make notification about not valid qrcode
  if (!action.payload.length) return

  yield setWallet(action.payload)
}

export default function* rootSaga() {
  yield all([
    takeEvery(scanTransaction, scanTx),
    takeEvery(scanWallets, complementWallets),
    takeEvery(initWebrtcConnaction, initializeWebrtcChannel),
    takeEvery(webrtcMessageReceived, webrtcListener),
  ])
}
