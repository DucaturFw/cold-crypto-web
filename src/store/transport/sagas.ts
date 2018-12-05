import { all, fork, put, takeEvery, select } from 'redux-saga/effects'
import { login, createTransaction, sendTransaction, createTransfer, remoteSignTransferTx } from './actions'
import { TransportActionTypes } from './types'
import { IApplicationState } from '..'
import { push } from 'connected-react-router'
import { getTxCommand, getEthTransferTx, getEosTransferTx } from '../../helpers/jsonrps'
import parseMessage from '../../utils/parseMessage'
import { sendTx } from '../../helpers/sendtx'
import { setSendingTxData, fetchSuccess } from '../wallets/actions'
import { authSuccess } from '../auth/actions'
import { setStatus, sendCommand } from '../webrtc/actions'
import { IWallet } from '../wallets/types'
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

function createTransferHandler<TFormData, TWallet extends IWallet>(getTransferTx: (form: TFormData, wallet: TWallet) => Promise<unknown>)
{
  return function* handleCreateTransfer(action: PayloadAction<TransportActionTypes, TFormData>)
  {
    const wallet = yield select((state: IApplicationState) => state.wallets.item)
    try
    {
      const tx = yield getTransferTx(action.payload, wallet)
      yield put(remoteSignTransferTx(tx))
    }
    catch(e)
    {
      
    }
  }
}
const handleCreateEthTransfer = createTransferHandler(getEthTransferTx)
const handleCreateEosTransfer = createTransferHandler(getEosTransferTx)
// const handleCreateEthContract = createContractHandler(getEthTransferTx)


function* handleCreateTx(action: ReturnType<typeof createTransaction>) {
  const wallet = yield select((state: IApplicationState) => state.wallets.item)
  const { connected } = yield select((state: IApplicationState) => state.webrtc)

  try {
    const {formData, txType } = action.payload

    const command = yield getTxCommand(formData, { ...wallet as IWallet }, txType)

    yield put(setSendingTxData({ command, formData, error: '', hash: '' }))

    if (connected) {
      yield all([
        put(setStatus('Verification')),
        put(push('/status')),
        put(sendCommand(command)),
      ])
    } else {
      yield put(push(`/wallets/${wallet.address}/tx/sign`))
    }
  } catch (err) {
    console.log('handleCreateTx error', err)
  }
}
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

function* handleSendTx(action: ReturnType<typeof sendTransaction>) {
  const wallet = yield select((state: IApplicationState) => state.wallets.item)
  try {
    const { result } = parseMessage(action.payload)
    console.log('handleSendTx', action)
    const hash = yield sendTx(result, wallet)

    yield all([put(setSendingTxData({ hash })), put(push(`/tx/${hash}`))])
  } catch (err) {
    yield all([
      put(setSendingTxData({ error: err.message })),
      put(push(`/tx/error`)),
    ])
    console.log('handleSendTx error', err)
  }
}

function* watchSendTx() {
  yield takeEvery(TransportActionTypes.SEND_TX, handleSendTx)
}

function* watchCreateTx() {
  yield takeEvery(TransportActionTypes.CREATE_TX, handleCreateTx)
}
function* watchRemoteSignTransfer() {
  yield takeEvery(TransportActionTypes.REMOTE_SIGN_TRANSFER, handleRemoteSignTransfer)
}

function* watchLogin() {
  yield takeEvery(TransportActionTypes.LOGIN, handleLogin)
}

function* transportSaga() {
  yield all([fork(watchLogin), fork(watchCreateTx), fork(watchSendTx), fork(watchRemoteSignTransfer)])
}

export default transportSaga
