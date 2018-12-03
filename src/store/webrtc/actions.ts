import { action } from 'typesafe-actions'
import { WebrtcActionTypes } from './types'

export const connectionReady = () => action(WebrtcActionTypes.Webrtc_SUCCESS)
export const setConnectionSid = () =>
  action(WebrtcActionTypes.SET_CONNECTION_SID)
