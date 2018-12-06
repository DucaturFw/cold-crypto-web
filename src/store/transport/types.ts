import { IHostCommand } from "../../helpers/webrtc/hostproto"

export enum TransportActionTypes {
  SEND_TX = '@@transport/SEND_TX',
  LOGIN = '@@transport/LOGIN',
  SIGN_TX = '@@transport/SIGNTX',
  CREATE_TX = '@@transport/CREATETX',

  SET_RTC_SID = '@@transport/SET_RTC_SID',
}

export interface ITransportState {
  qrcodeData: string
  lastWebrtcMsg: IHostCommand<unknown[], unknown> | null
}
