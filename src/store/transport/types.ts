import { IHostCommand } from "../../helpers/webrtc/hostproto"

export enum TransportActionTypes {
  SEND_TX = '@@transport/SEND_TX',
  LOGIN = '@@transport/LOGIN',
  SIGN_TX = '@@transport/SIGNTX',
  CREATE_TX = '@@transport/CREATETX',

  SET_RTC_SID = '@@transport/SET_RTC_SID',
}
export type TransportActionType =
  | { type: TransportActionTypes.SEND_TX }
  | { type: TransportActionTypes.LOGIN }
  | { type: TransportActionTypes.SIGN_TX, payload: IHostCommand<unknown[], unknown> }
  | { type: TransportActionTypes.CREATE_TX }
  | { type: TransportActionTypes.SET_RTC_SID, payload: string }

export interface ITransportState {
  qrcodeData: string
  pushedMessages: IHostCommand<unknown[], unknown>[]
}
