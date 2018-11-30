export enum QrcodeActionTypes {
  SCAN_LOGIN_DATA_SUCCESS = '@@qrcode/SCAN_LOGIN_DATA_SUCCESS',
  SCAN_LOGIN_DATA_ERROR = '@@qrcode/SCAN_LOGIN_DATA_ERROR',
}

export interface IQrcodeState {
  error: any
}
