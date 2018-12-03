import { action } from 'typesafe-actions'
import { TransportActionTypes } from './types'
import { IEthTxFormValues } from '../wallets/types'

export const createTransaction = (tx: IEthTxFormValues) =>
  action(TransportActionTypes.CREATE_TX, tx)

export const signTransaction = (tx: string) =>
  action(TransportActionTypes.SIGN_TX, tx)

export const sendTransaction = (tx: string) =>
  action(TransportActionTypes.SEND_TX, tx)

export const login = (message: string) =>
  action(TransportActionTypes.LOGIN, message)

export const setRtcSid = (sid: string) =>
  action(TransportActionTypes.SET_RTC_SID, sid)
