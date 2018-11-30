export enum QrcodeActionTypes {
  SCAN_LOGIN_DATA_SUCCESS = '@@qrcode/SCAN_LOGIN_DATA_SUCCESS',
  SCAN_LOGIN_DATA_ERROR = '@@qrcode/SCAN_LOGIN_DATA_ERROR',
  SET_SIGN_DATA = '@@qrcode/SET_SIGN_DATA',
  SEND_SIGN_DATA = '@@qrcode/SEND_SIGN_DATA',
}

export interface IQrcodeState {
  error: any
  signData: string
}
