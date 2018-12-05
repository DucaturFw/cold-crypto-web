import { action } from 'typesafe-actions'
import { TransportActionTypes } from './types'
import { IEthTxFormValues, IEthContractFormValues, IEosTxFormValues } from '../wallets/types'

export const createEthTransfer = (formData: IEthTxFormValues) =>
  action(TransportActionTypes.CREATE_ETH_TRANSFER, formData)

export const createEosTransfer = (formData: IEosTxFormValues) =>
  action(TransportActionTypes.CREATE_EOS_TRANSFER, formData)

export const createEthContract = (formData: IEthContractFormValues) =>
  action(TransportActionTypes.CREATE_ETH_CONTRACT, formData)

export const remoteSignTransferTx = (tx: unknown) =>
  action(TransportActionTypes.REMOTE_SIGN_TRANSFER, tx)

export const remoteSignContractTx = (params: unknown) =>
  action(TransportActionTypes.REMOTE_SIGN_CONTRACT, params)

export const signTransaction = (tx: string) =>
  action(TransportActionTypes.SIGN_TX, tx)

export const sendTransaction = (tx: string) =>
  action(TransportActionTypes.SEND_TX, tx)

export const login = (message: string) =>
  action(TransportActionTypes.LOGIN, message)

export const setRtcSid = (sid: string) =>
  action(TransportActionTypes.SET_RTC_SID, sid)
