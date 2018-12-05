export enum TransportActionTypes {
  SEND_TX = '@@transport/SEND_TX',
  LOGIN = '@@transport/LOGIN',
  SIGN_TX = '@@transport/SIGNTX',
  CREATE_TX = '@@transport/CREATETX',

  CREATE_ETH_TRANSFER = '@@transport/CREATE_ETH_TRANSFER',
  CREATE_EOS_TRANSFER = '@@transport/CREATE_EOS_TRANSFER',
  CREATE_ETH_CONTRACT = '@@transport/CREATE_ETH_CONTRACT',

  REMOTE_SIGN_TRANSFER = '@@transport/REMOTE_SIGN_TX',
  REMOTE_SIGN_CONTRACT = '@@transport/REMOTE_SIGN_CONTRACT',


  SET_RTC_SID = '@@transport/SET_RTC_SID',
}

export interface ITransportState {
  qrcodeData: string
}
