import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { WalletsActionTypes } from './types'
import { fetchError, fetchSuccess, addWallet, fetchRequest } from './actions'
import { getBcInfo } from '../../helpers/common'

function* handleSetWallet(action: ReturnType<typeof addWallet>) {
  try {
    let wallet = action.payload
    // start fetch request for update wallet data
    yield put(fetchRequest())
    // fetch wallets txs history
    const res = yield call(getBcInfo, wallet)

    // added txs history
    wallet = { ...wallet, ...res }

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
