import { navigate } from 'fuse-react'
import { eventChannel } from 'redux-saga'
import { call, put, take, takeEvery, all, select } from 'redux-saga/effects'
const EthereumTx = require('ethereumjs-tx')
import { getNonce, sendTx } from '../services/ethHelper'
import { addWallets, scanWallets, scanTransaction, initWebrtcConnaction, webrtcMessageReceived, setLastTransaction } from '../actions'
import { RTCCommands } from '../constants' 
import { log } from 'util';

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
  const { webrtc } = yield select(state => state)
  const channel = yield call(createEventChannel, webrtc);
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
  
  const commandId = parts[0]
  const data = JSON.parse(parts[1])

  switch (commandId) {
    case RTCCommands.getWalletList:
      yield setWallet(data)
      break
    case RTCCommands.signTransferTx: 
      yield scanTx(data)
      break
    default:
      break
  }
}

function* scanTx(action) {
  if(action.payload instanceof Error) {
    return
  }

  let tx = new EthereumTx(action.payload)
  let transactionHash

  try {
    transactionHash = yield sendTx(action.payload)
    tx.hash = transactionHash
    yield put(setLastTransaction(tx))
  } catch (error) {
    yield put(setLastTransaction(error))
  }

  navigate(`/hash`)
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
