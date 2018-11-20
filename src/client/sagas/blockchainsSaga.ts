import { all, call, fork, put } from 'redux-saga/effects'
import fetchJson from './fetch'

import { setBlockchainGasInfo, setBlockchainTicker } from '../actions'

function* fetchBlockchainGasInfo() {
  const [ response, error ] = yield call(fetchJson, 'https://ethgasstation.info/json/ethgasAPI.json')
  if (error) throw error
  yield put(setBlockchainGasInfo({ key: 'eth', value: response }))
}

function* fetchBlockchainTicker() {
  const [ response, error ] = yield call(fetchJson, 'https://api.coinmarketcap.com/v1/ticker/ethereum/')
  if (error) throw error
  yield put(setBlockchainTicker({ key: 'eth', value: response[0] }))
}

export default function* blockchainsSaga() {
  try {
    yield all([
      call(fetchBlockchainGasInfo),
      call(fetchBlockchainTicker),
    ])
  } catch (err) {
    console.log(err)
  }
}
