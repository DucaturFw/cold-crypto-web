import { navigate } from 'fuse-react'
import { eventChannel } from 'redux-saga'
import { call, put, take, takeEvery, all } from 'redux-saga/effects'
import { getNonce, sendTx } from '../services/ethHelper'
import Rtc from '../services/webrtc'
import { addWallets, scanWallets, scanTransaction, initWebrtcConnaction, webrtcMessageReceived } from '../actions'

function* createEventChannel(rtc) {
  return eventChannel(emit => {
    rtc.dataChannel.onmessage = ((message) => {
      return emit(message.data)
    });

    return () => {
      rtc.close();
    };
  });
}

function* initializeWebrtcChannel() {
  const channel = yield call(createEventChannel, Rtc);
  while (true) {
    const message = yield take(channel);
    console.log(message);
    yield put(webrtcMessageReceived(message));
  }
}

function* setWallet(wallet) {
  const wallets = yield wallet.map(item => {
    return getNonce(item.address).then(resolve => {
      return { ...item, nonce: resolve }
    })
  });

  yield put(addWallets(wallets))
  navigate('/wallets')
}

function* webrtcListener(action) {
  const parts =  action.payload.split('|').filter(Boolean)

  switch (parts[0]) {
    case "1":
      yield setWallet(JSON.parse(parts[1]))
      break;

    default:
      break;
  }
}

function* scanTx(action) {
  if(action.payload instanceof Error) {
    return
  }

  yield sendTx(action.payload)
  navigate('/wallets')
}

function* complementWallets(action) {
  //TODO: make notification about not valid qrcode
  if(!action.payload.length) {
    return
  }

  yield setWallet(action.payload)
}

export default function* rootSaga() {
  yield all([
    takeEvery(scanTransaction, scanTx),
    takeEvery(scanWallets, complementWallets),
    takeEvery(initWebrtcConnaction, initializeWebrtcChannel),
    takeEvery(webrtcMessageReceived, webrtcListener)
  ])
}
