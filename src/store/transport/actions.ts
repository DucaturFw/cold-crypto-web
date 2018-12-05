import { action } from 'typesafe-actions'
import { TransportActionTypes } from './types'
import { IEthTxFormValues, IEosTxFormValues, IEthContractFormValues } from '../wallets/types'

export const createContract = (contract: IEthContractFormValues) =>
  action(TransportActionTypes.CREATE_CONTRACT, contract)

export const createTransaction = (tx: IEthTxFormValues | IEosTxFormValues) =>
  action(TransportActionTypes.CREATE_TX, tx)

export const signTransaction = (tx: string) =>
  action(TransportActionTypes.SIGN_TX, tx)

export const sendTransaction = (tx: string) =>
  action(TransportActionTypes.SEND_TX, tx)

export const login = (message: string) =>
  action(TransportActionTypes.LOGIN, message)

export const setRtcSid = (sid: string) =>
  action(TransportActionTypes.SET_RTC_SID, sid)
