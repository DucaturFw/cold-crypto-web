import { action } from 'typesafe-actions'
import { TransportActionTypes } from './types'
import { IEthTxFormValues, IEosTxFormValues, IWalletBase } from '../wallets/types'

export const createTransaction = (tx: IEthTxFormValues | IEosTxFormValues) =>
  action(TransportActionTypes.CREATE_TX, tx)

export const signTransaction = (tx: string) =>
  action(TransportActionTypes.SIGN_TX, tx)

export const sendTransaction = (tx: string, wallet: IWalletBase) =>
  action(TransportActionTypes.SEND_TX, { tx, wallet })

export const login = (message: string) =>
  action(TransportActionTypes.LOGIN, message)

export const setRtcSid = (sid: string) =>
  action(TransportActionTypes.SET_RTC_SID, sid)
