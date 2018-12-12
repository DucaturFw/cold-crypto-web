import { RTCHelper } from '../../helpers/webrtc/webrtc'
import { IHostCommandU } from '../../helpers/webrtc/hostproto'

export enum WebrtcActionTypes {
  CONNECTION_OPEN = '@@Webrtc/CONNECTION_OPEN',
  CONNECTION_CLOSE = '@@Webrtc/CONNECTION_CLOSE',
  SET_CONNECTION_SID = '@@Webrtc/SET_CONNECTION_SID',
  SET_STATUS = '@@Webrtc/SET_STATUS',
  SEND_COMMAND = '@@Webrtc/SEND_COMMAND',
  SET_SENDER = '@@Webrtc/SET_SENDER'
}

export interface IWebrtcState {
  readonly rtc: RTCHelper
  readonly send: (data: string) => void
  readonly connected: boolean
  readonly status: string
  pushedMessages: IHostCommandU[]
}
