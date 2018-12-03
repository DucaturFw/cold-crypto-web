import { action } from 'typesafe-actions'
import { WebrtcActionTypes } from './types'

export const connectionReady = () =>
  action(WebrtcActionTypes.CONNECTION_SUCCESS)
export const setConnectionSid = () =>
  action(WebrtcActionTypes.SET_CONNECTION_SID)

export const setStatus = (status: string) =>
  action(WebrtcActionTypes.SET_STATUS, status)
