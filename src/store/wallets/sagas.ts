import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { WalletsActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import callApi from '../../utils/callApi'

const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || 'https://rinkeby.etherscan.io/'

function* handleFetch() {
  try {
    const res = yield call(callApi, 'get', API_ENDPOINT, '/tx/address')

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res))
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
  yield takeEvery(WalletsActionTypes.FETCH_REQUEST, handleFetch)
}

function* walletsSaga() {
  yield all([fork(watchFetchRequest)])
}

export default walletsSaga
