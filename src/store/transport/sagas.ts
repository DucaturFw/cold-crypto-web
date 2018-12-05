import { all, fork, put, takeEvery, select } from 'redux-saga/effects'
import { login, sendTransaction, remoteSignTransferTx, remoteSignContractTx } from './actions'
import { TransportActionTypes } from './types'
import { IApplicationState } from '..'
import { push } from 'connected-react-router'
import { getEthTransferTx, getEosTransferTx, getEthContractParams } from '../../helpers/jsonrps'
import parseMessage from '../../utils/parseMessage'
import { sendTx } from '../../helpers/sendtx'
import { setSendingTxData, fetchSuccess } from '../wallets/actions'
import { authSuccess } from '../auth/actions'
import { sendCommand } from '../webrtc/actions'
import { IWallet, IFormContractData, IFormTransferData } from '../wallets/types'
import { PayloadAction } from 'typesafe-actions/dist/types'

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



function createContractHandler<TFormData extends IFormContractData, TWallet extends IWallet>(getContractParams: (form: TFormData, wallet: TWallet) => Promise<unknown>)
{
  return function* handleCreateTransfer(action: PayloadAction<TransportActionTypes, TFormData>)
  {
    const wallet = yield select((state: IApplicationState) => state.wallets.item)
    delete wallet.txs

    try
    {
      const params = yield getContractParams(action.payload, wallet)
      yield put(handleRemoteSignContract(params))
    }
    catch(e)
    {
      console.error(e)
    }
  }
}

function createTransferHandler<TFormData extends IFormTransferData, TWallet extends IWallet>(getTransferTx: (form: TFormData, wallet: TWallet) => Promise<unknown>)
{
  return function* handleCreateTransfer(action: PayloadAction<TransportActionTypes, TFormData>)
  {
    const wallet = yield select((state: IApplicationState) => state.wallets.item)
    delete wallet.txs

    try
    {
      const tx = yield getTransferTx(action.payload, wallet)
      yield put(remoteSignTransferTx(tx))
    }
    catch(e)
    {
      console.error(e)
    }
  }
}

const handleCreateEthTransfer = createTransferHandler(getEthTransferTx)
const handleCreateEosTransfer = createTransferHandler(getEosTransferTx)
const handleCreateEthContract = createContractHandler(getEthContractParams)

function* handleRemoteSignTransfer(action: ReturnType<typeof remoteSignTransferTx>)
{
  const wallet = yield select((state: IApplicationState) => state.wallets.item)
  
  try
  {
    let cmd = { id: 2, method: 'signTransferTx', params: { tx: action.payload, wallet } }

    yield put(sendCommand(cmd))
  }
  catch (e)
  {
    console.error(e)
  }
}

function* handleRemoteSignContract(action: ReturnType<typeof remoteSignContractTx>)
{
  try
  {
    let cmd = { id: 4, method: 'signContractCall', params: action.payload}

    yield put(sendCommand(cmd))
  }
  catch (e)
  {
    console.error(e)
  }
}


function* handleSendTx(action: ReturnType<typeof sendTransaction>) {
  const wallet = yield select((state: IApplicationState) => state.wallets.item)
  try {
    const { result } = parseMessage(action.payload)

    const hash = yield sendTx(result, wallet)

    yield all([put(setSendingTxData({ hash })), put(push(`/tx/${hash}`))])
  } catch (err) {
    yield all([
      put(setSendingTxData({ error: err.message })),
      put(push(`/tx/error`)),
    ])
    console.error(err)
  }
}

function* watchSendTx() {
  yield takeEvery(TransportActionTypes.SEND_TX, handleSendTx)
}

function* watchCreateTx() {
  yield takeEvery(TransportActionTypes.CREATE_ETH_TRANSFER, handleCreateEthTransfer)
  yield takeEvery(TransportActionTypes.CREATE_EOS_TRANSFER, handleCreateEosTransfer)
  yield takeEvery(TransportActionTypes.CREATE_ETH_CONTRACT, handleCreateEthContract)
}

function* watchRemoteSignTransfer() {
  yield takeEvery(TransportActionTypes.REMOTE_SIGN_TRANSFER, handleRemoteSignTransfer)
  yield takeEvery(TransportActionTypes.REMOTE_SIGN_CONTRACT, handleRemoteSignContract)
}

function* watchLogin() {
  yield takeEvery(TransportActionTypes.LOGIN, handleLogin)
}

function* transportSaga() {
  yield all([fork(watchLogin), fork(watchCreateTx), fork(watchSendTx), fork(watchRemoteSignTransfer)])
}

export default transportSaga
