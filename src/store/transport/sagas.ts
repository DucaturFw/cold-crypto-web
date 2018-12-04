import { all, fork, put, takeEvery, select } from 'redux-saga/effects'
import { login, createTransaction, sendTransaction } from './actions'
import { TransportActionTypes } from './types'
import { IApplicationState } from '..'
import { push } from 'connected-react-router'
import { getSignTransferTxCommand } from '../../helpers/jsonrps'
import parseMessage from '../../utils/parseMessage'
import { sendTx } from '../../helpers/sendtx'
import { setSendingTxData, fetchSuccess } from '../wallets/actions'
import { authSuccess } from '../auth/actions'
import { setStatus } from '../webrtc/actions'

function* handleLogin(action: ReturnType<typeof login>) {
  try {
    // TODO: check correct message id
    const { result: wallets } = parseMessage(action.payload)
    const wallet = wallets[0]

    // call addWallet and authSuccess after success read and parse qrcode from login page
    yield put(authSuccess())
    yield put(fetchSuccess(wallet))
    yield put(push(`/wallets/${wallet.address}`))
  } catch (err) {
    console.log('handleLogin error', err)
  }
}

function* handleCreateTx(action: ReturnType<typeof createTransaction>) {
  const wallet = yield select((state: IApplicationState) => state.wallets.item)
  const { connected, rtc } = yield select(
    (state: IApplicationState) => state.webrtc
  )
  try {
    const txFormData = action.payload

    const signedData = yield getSignTransferTxCommand(txFormData, {
      blockchain: wallet.blockchain,
      chainId: wallet.chainId,
      address: wallet.address,
      nonce: wallet.nonce,
    })
    console.log(signedData)

    yield put(
      setSendingTxData({
        signTx: signedData,
        formData: txFormData,
        error: '',
        hash: '',
      })
    )

    if (connected) {
      // TODO: create action from webrtc store
      yield all([put(setStatus('Verification')), put(push('/status'))])
      rtc.dataChannel.send(signedData)
    } else {
      yield put(push(`/wallets/${wallet.address}/tx/sign`))
    }
  } catch (err) {
    console.log('handleCreateTx error', err)
  }
}

function* handleSendTx(action: ReturnType<typeof sendTransaction>) {
  try {
    const { result } = parseMessage(action.payload.tx)

    const hash = yield sendTx(result, action.payload.wallet)
    console.log(hash);

    yield all([
      put(setSendingTxData({ hash })),
      put(push(`/tx/${hash}`)),
    ])
  } catch (err) {
    yield all([
      put(setSendingTxData({ error: err.message })),
      put(push(`/tx/error`)),
    ])
    console.log('handleSendTx error', err)
  }
}

function* watchSendTx() {
  yield takeEvery(TransportActionTypes.SEND_TX, handleSendTx)
}

function* watchCreateTx() {
  yield takeEvery(TransportActionTypes.CREATE_TX, handleCreateTx)
}

function* watchLogin() {
  yield takeEvery(TransportActionTypes.LOGIN, handleLogin)
}

function* transportSaga() {
  yield all([fork(watchLogin), fork(watchCreateTx), fork(watchSendTx)])
}

export default transportSaga
