export enum WebrtcActionTypes {
  Webrtc_SUCCESS = '@@Webrtc/Webrtc_SUCCESS',
  SET_CONNECTION_SID = '@@Webrtc/SET_CONNECTION_SID',
}

export interface IWebrtcState {
  readonly rtc: any
  readonly connected: boolean
}
