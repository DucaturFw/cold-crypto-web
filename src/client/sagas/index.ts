import { navigate } from 'fuse-react'
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects'
import {getNonce} from '../services/ethHelper'
import qrcode from 'qrcode'
import RTCHelper from '../services/webrtc'
import { fetchWallet } from '../services/api'

import { generateQr, setQr, setQrScanned, addWallets, scanWallets } from '../actions'

function* rtcConnect() {
  const mobileClient = async () => {
    const p2 = new RTCHelper('mobile')
    await p2.waitConnection()
  }

  const connect = async () => {
    const p1 = new RTCHelper('host')
    const offer = await p1.createOffer()
    console.log(offer)
    await p1.waitConnection()
    console.log(`connected (definitely, maybe)`)
    p1.dataChannel!.send('hello')
  }
}

function* watchForQRScan() {
  while (true)
    try {
      const { payload } = yield take(setQrScanned)
      if (!Array.isArray(JSON.parse(payload)))
        throw Error('Scanned data is not an Array')
      else
        navigate('/wallets')
    } catch (err) {
      yield put(setQrScanned(err))
    }
}

function* genQr() {
  const { payload: { key, value } } = yield take(generateQr)
  const qr = yield call(qrcode.toDataURL, value)
  yield put(setQr({ key, value: qr }))
}

function* complementWallets(action) {
  const wallets = yield action.payload.map(item => {
    return getNonce(item.address).then(resolve => {
      return { ...item, nonce: resolve }
    })
  });

  yield put(addWallets(wallets))
  navigate('/wallets')
}

function* scanWalletsData() {
  yield takeEvery(scanWallets, complementWallets)
}

export default function* rootSaga() {
  yield all([
    fork(genQr),
    fork(watchForQRScan),
    fork(scanWalletsData),
  ])
}
