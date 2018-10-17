import { navigate } from 'fuse-react'
import { call, put, take, takeEvery } from 'redux-saga/effects'
import { getNonce, sendTx } from '../services/ethHelper'
import qrcode from 'qrcode'
import RTCHelper from '../services/webrtc'

import { generateQr, setQr, setQrScanned, addWallets, scanWallets, scanTransaction } from '../actions'

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

function* scanTx(action) {
 yield sendTx(action.payload)
 navigate('/wallets')
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

export default function* rootSaga() {
  yield takeEvery(scanTransaction, scanTx)
  yield takeEvery(scanWallets, complementWallets)
}
