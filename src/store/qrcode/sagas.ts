import { all, fork, put, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { QrcodeActionTypes } from './types'
import { addWallet } from '../wallets/actions'
import { authSuccess } from '../auth/actions'
import { scanLoginSuccess, scanLoginError } from './actions'
import parseMessage from '../../utils/parseMessage'

function* handleParseScanData(action: ReturnType<typeof scanLoginSuccess>) {
  try {
    // TODO: check correct message id
    const { result } = parseMessage(action.payload)

    // call addWallet and authSuccess after success read and parse qrcode from login page
    yield put(authSuccess())
    // TODO: fix this hack - result[0] ohohoho
    yield put(push(`/wallets/${result[0].address}`))
    yield put(addWallet(result[0]))
  } catch (err) {
    if (err instanceof Error) {
      yield put(scanLoginError(err))
    } else {
      yield put(scanLoginError('An unknown error occured.'))
    }
  }
}

function* watchLoginScan() {
  yield takeEvery(
    QrcodeActionTypes.SCAN_LOGIN_DATA_SUCCESS,
    handleParseScanData
  )
}

function* qrcodeSaga() {
  yield all([fork(watchLoginScan)])
}

export default qrcodeSaga
