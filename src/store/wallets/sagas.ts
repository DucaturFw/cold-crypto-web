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
import { IApplicationState } from '..'
import { setSignQrcodeData } from '../qrcode/actions'
import { push } from 'connected-react-router'
import { getBcInfo } from '../../helpers/common'


function* handleSetWallet(action: ReturnType<typeof addWallet>) {
  try {
    let wallet = action.payload
    // start fetch request for update wallet data
    yield put(fetchRequest())
    // fetch wallets txs history
    const res = yield call(
      getBcInfo,
      wallet
    )

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

function* handleCreateSignedData(action: ReturnType<typeof createWalletTx>) {
  // get wallet from store
  const wallet = yield select((state: IApplicationState) => state.wallets.item)

  try {
    const txFormData = action.payload

    const signedData = yield getSignTransferTxCommand(txFormData, {
      blockchain: wallet.blockchain,
      chainId: wallet.chainId,
      address: wallet.address,
      nonce: wallet.nonce,
    })

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
