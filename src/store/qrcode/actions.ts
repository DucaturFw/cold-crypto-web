import { action } from 'typesafe-actions'
import { QrcodeActionTypes } from './types'

export const scanLoginSuccess = (data: string) =>
  action(QrcodeActionTypes.SCAN_LOGIN_DATA_SUCCESS, data)
export const scanLoginError = (error: any) =>
  action(QrcodeActionTypes.SCAN_LOGIN_DATA_ERROR, error)

export const setSignQrcodeData = (data: string) =>
  action(QrcodeActionTypes.SET_SIGN_DATA, data)

export const sendTransaction = (data: string) =>
  action(QrcodeActionTypes.SEND_SIGN_DATA, data)
