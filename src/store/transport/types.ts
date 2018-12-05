export enum TransportActionTypes {
  SEND_TX = '@@transport/SEND_TX',
  LOGIN = '@@transport/LOGIN',
  SIGN_TX = '@@transport/SIGNTX',
  CREATE_TX = '@@transport/CREATETX',

  CREATE_TRANSFER = '@@transport/CREATE_TRANSFER',
  CREATE_ETH_TRANSFER = '@@transport/CREATE_ETH_TRANSFER',
  CREATE_EOS_TRANSFER = '@@transport/CREATE_EOS_TRANSFER',

  REMOTE_SIGN_TRANSFER = '@@transport/REMOTE_SIGN_TX',

  SET_RTC_SID = '@@transport/SET_RTC_SID',
}

export interface ITransportState {
  qrcodeData: string
}
