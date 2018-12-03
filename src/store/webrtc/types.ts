export enum WebrtcActionTypes {
  CONNECTION_SUCCESS = '@@Webrtc/CONNECTION_SUCCESS',
  SET_CONNECTION_SID = '@@Webrtc/SET_CONNECTION_SID',
}

export interface IWebrtcState {
  readonly rtc: any
  readonly connected: boolean
}
