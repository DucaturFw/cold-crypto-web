import { eventChannel } from 'redux-saga'
import { call, put, take, takeEvery, all, select, fork } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { parseMessage, parseJsonString } from '../helpers/json'
import { signTransferTx } from '../helpers/webrtc'
import { getNonce, sendTx } from '../services/ethHelper'
import { RTCCommands } from '../constants'
import WebRTC from '../services/webrtc'

import {
  addWallets,
  scanWallets,
  scanTransaction,
  initWebrtcConnaction,
  webrtcMessageReceived,
  setLastTransaction,
  startSendingTx,
  setPayData,
  signTxRequest,
  setSignedData,
  setScanResult,
  ITxSignFormData,
} from '../actions'

import { IWallet } from '../reducers/walletReducer'

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
  const channel = yield call(createEventChannel, webrtc)
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

  if(wallets.length === 1) {
    const payData = yield select((state: any) => state.wallet.payData)

    // navigate(`/${Object.keys(payData).length ? 'txCreation': 'wallet'}/${wallet[0].blockchain}/${wallet[0].address}`)
    return
  }

  // navigate('/wallets')
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
  yield put(setPayData({}))
  // navigate(`/tx`)
}

function* complementWallets(action) {
  // TODO: make notification about not valid qrcode
  if (!action.payload.length) return

  yield setWallet(action.payload)
}

function waitForTxSignRequest(webrtc: WebRTC) {
  return function*() {
    while (true) {
      type SignTxRequestPayload = { payload: { data: ITxSignFormData, wallet: IWallet } }
      const { payload: { data, wallet } }: SignTxRequestPayload = yield take(signTxRequest)
      const signedData = signTransferTx(data, wallet)

      yield put(setSignedData(signedData))
      if (webrtc.connected) webrtc.dataChannel.send(signedData)
      // else throw Error('WebRTC is not connected') // TODO: handle it?

      yield put(push(`/txCreation/${wallet.blockchain}/${wallet.address}/sign`))

      const { payload } = yield take(setScanResult)
      if (payload instanceof Error) throw payload // TODO: handle it too

      const jsonResult = parseJsonString(payload.substr(3))

      alert(jsonResult) // TODO: what's next?
    }
  }
}

export default function* rootSaga() {
  const webrtc = new WebRTC()

  yield all([
    takeEvery(scanTransaction, scanTx),
    takeEvery(scanWallets, complementWallets),
    takeEvery(initWebrtcConnaction, initializeWebrtcChannel),
    takeEvery(webrtcMessageReceived, webrtcListener),
    fork(waitForTxSignRequest(webrtc)),
  ])
}
