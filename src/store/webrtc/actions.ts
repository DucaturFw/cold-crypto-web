import { action } from 'typesafe-actions'
import { WebrtcActionTypes } from './types'
import { IHostCommand } from '../../helpers/webrtc/hostproto'

export const connectionReady = () =>
  action(WebrtcActionTypes.CONNECTION_OPEN)

export const connectionClosing = () =>
  action(WebrtcActionTypes.CONNECTION_CLOSE)

export const setConnectionSid = () =>
  action(WebrtcActionTypes.SET_CONNECTION_SID)

export const setStatus = (status: string) =>
  action(WebrtcActionTypes.SET_STATUS, status)

export const sendCommand = (command: IHostCommand<unknown[], unknown>) =>
  action(WebrtcActionTypes.SEND_COMMAND, command)
