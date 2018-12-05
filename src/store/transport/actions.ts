import { action } from 'typesafe-actions'
import { TransportActionTypes } from './types'
import { FormValues } from '../wallets/types'
import { TxTypes } from '../../helpers/jsonrps'

export const createTransaction = (formData: FormValues, txType: TxTypes) =>
  action(TransportActionTypes.CREATE_TX, {formData, txType})

export const signTransaction = (tx: string) =>
  action(TransportActionTypes.SIGN_TX, tx)

export const sendTransaction = (tx: string) =>
  action(TransportActionTypes.SEND_TX, tx)

export const login = (message: string) =>
  action(TransportActionTypes.LOGIN, message)

export const setRtcSid = (sid: string) =>
  action(TransportActionTypes.SET_RTC_SID, sid)
