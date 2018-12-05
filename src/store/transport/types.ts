export enum TransportActionTypes {
  SEND_TX = '@@transport/SEND_TX',
  LOGIN = '@@transport/LOGIN',
  SIGN_TX = '@@transport/SIGNTX',
  CREATE_TX = '@@transport/CREATETX',
  CREATE_CONTRACT = '@@transport/CREATE_CONTRACT',

  SET_RTC_SID = '@@transport/SET_RTC_SID',
}

export interface ITransportState {
  qrcodeData: string
}
