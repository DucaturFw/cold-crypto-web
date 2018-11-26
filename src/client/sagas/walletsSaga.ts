import { fork, call, take, put } from 'redux-saga/effects'
import fetchJson from './fetchSaga'

import { WALLET_PATH } from '../routes'
import { setTxsOfWallet, setRoutePath } from '../actions'

const makeTxsRequestPathOfEth = (address: string) =>
  `//api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`

const makeTxsRequestPathOfEos = (address: string) =>
  `//api.eospark.com/api?module=account&action=get_account_related_trx_info&apikey=a9564ebc3289b7a14551baf8ad5ec60a&account=${address}&page=1&size=999`

function* fetchTxOfWallet(blockchain: 'eth' | 'eos', address: string) {
  const txsRequestPath = blockchain === 'eth'
    ? makeTxsRequestPathOfEth(address)
    : makeTxsRequestPathOfEos(address)

  const [ response, error ] = yield call(fetchJson, txsRequestPath)
  if (error) throw error
  yield put(setTxsOfWallet({ blockchain, address, txs: response.result }))
}

function* waitForRequestTxsSaga() {
  while (true) try {
    const { payload: { path, params: { blockchain, address } } } = yield take(setRoutePath)
    if (path === WALLET_PATH)
      yield call(fetchTxOfWallet, blockchain, address)
  } catch (err) {
    console.log(err)
  }
}

export default function* walletsSaga() {
  yield fork(waitForRequestTxsSaga)
}
