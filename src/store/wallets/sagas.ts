import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { WalletsActionTypes } from './types'
import { fetchError, fetchSuccess, addWallet, fetchRequest } from './actions'
import callApi from '../../utils/callApi'

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
    // added txs history
    wallet = { ...wallet, txs: res.result }

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

function* watchFetchRequest() {
  yield takeEvery(WalletsActionTypes.ADD_WALLET, handleSetWallet)
}

function* walletsSaga() {
  yield all([fork(watchFetchRequest)])
}

export default walletsSaga
