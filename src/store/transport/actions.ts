import { action } from 'typesafe-actions'
import { TransportActionTypes } from './types'
import { FormValues, IEthTxFormValues } from '../wallets/types'
import { TxTypes } from '../../helpers/jsonrps'

export const createTransaction = (formData: FormValues, txType: TxTypes) =>
  action(TransportActionTypes.CREATE_TX, {formData, txType})

export const createTransfer = (formData: IEthTxFormValues) =>
  action(TransportActionTypes.CREATE_TX, formData)

export const remoteSignTransferTx = (tx: unknown) =>
  action(TransportActionTypes.REMOTE_SIGN_TRANSFER, tx)

export const signTransaction = (tx: string) =>
  action(TransportActionTypes.SIGN_TX, tx)

export const sendTransaction = (tx: string) =>
  action(TransportActionTypes.SEND_TX, tx)

export const login = (message: string) =>
  action(TransportActionTypes.LOGIN, message)

export const setRtcSid = (sid: string) =>
  action(TransportActionTypes.SET_RTC_SID, sid)
