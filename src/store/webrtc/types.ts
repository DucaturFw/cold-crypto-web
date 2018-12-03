export enum WebrtcActionTypes {
  CONNECTION_OPEN = '@@Webrtc/CONNECTION_OPEN',
  CONNECTION_CLOSE = '@@Webrtc/CONNECTION_CLOSE',
  SET_CONNECTION_SID = '@@Webrtc/SET_CONNECTION_SID',
  SET_STATUS = '@@Webrtc/SET_STATUS',
}

export interface IWebrtcState {
  readonly rtc: any
  readonly connected: boolean
  readonly status: string
}
