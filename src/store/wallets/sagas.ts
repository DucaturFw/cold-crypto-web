import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects'
import { WalletsActionTypes } from './types'
import {
  fetchError,
  fetchSuccess,
  addWallet,
  fetchRequest,
  createWalletTx,
} from './actions'
import { getSignTransferTxCommand } from '../../helpers/jsonrps'
import callApi from '../../utils/callApi'
import { IApplicationState } from '..'
import { setSignQrcodeData } from '../qrcode/actions'
import { push } from 'connected-react-router'
import { getNonce } from '../../helpers/eth'

// TODO: make blockchain config for explorer
const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || 'https://api-rinkeby.etherscan.io'

function* handleSetWallet(action: ReturnType<typeof addWallet>) {
  try {
    let wallet = action.payload
    // start fetch request for update wallet data
    yield put(fetchRequest())
    // fetch wallets txs history
    const res = yield call(
      callApi,
      'get',
      API_ENDPOINT,
      `/api?module=account&action=txlist&address=${
        wallet.address
      }&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`
    )

    const nonce = yield getNonce(wallet.address)
    // added txs history
    wallet = { ...wallet, txs: res.result, nonce }

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(wallet))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* handleCreateSignedData(action: ReturnType<typeof createWalletTx>) {
  // get wallet from store
  const wallet = yield select((state: IApplicationState) => state.wallets.item)
  try {
    const txFormData = action.payload

    const signedData = yield getSignTransferTxCommand(txFormData, wallet)

    yield put(setSignQrcodeData(signedData))

    yield put(push(`/sign`))
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(WalletsActionTypes.ADD_WALLET, handleSetWallet)
}

function* watchCreateTxData() {
  yield takeEvery(WalletsActionTypes.CREATE_WALLET_TX, handleCreateSignedData)
}

function* walletsSaga() {
  yield all([fork(watchFetchRequest), fork(watchCreateTxData)])
}

export default walletsSaga
