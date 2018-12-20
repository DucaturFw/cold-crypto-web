import { all, call, put, fork, takeEvery } from 'redux-saga/effects'
import { PriceActionTypes, ICurrencyPrice } from './types'
import { priceGet, priceSet } from './actions'
import { getEth, getEos } from '../../helpers/prices'

function* handleGetPrice(action: ReturnType<typeof priceGet>) {
  try {
    const res = yield all([
      call(getEth), 
      call(getEos)
    ])

    const prices: ICurrencyPrice[] = res.map((item: any) => ({
      symbol: item.data.symbol.toLowerCase(),
      price: item.data.quotes.USD.price
    }))

    yield put(priceSet(prices))

  } catch (err) {
    if (err instanceof Error) {
     console.error(err)
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(PriceActionTypes.PRICE_GET, handleGetPrice)
}

function* walletsSaga() {
  yield all([fork(watchFetchRequest)])
}

export default walletsSaga
