import { action } from 'typesafe-actions'
import { WebrtcActionTypes } from './types'
import { IHostCommandU } from '../../helpers/webrtc/hostproto'

export const connectionReady = () =>
  action(WebrtcActionTypes.CONNECTION_OPEN)

export const connectionClosing = () =>
  action(WebrtcActionTypes.CONNECTION_CLOSE)

export const setConnectionSid = () =>
  action(WebrtcActionTypes.SET_CONNECTION_SID)

export const setStatus = (status: string) =>
  action(WebrtcActionTypes.SET_STATUS, status)

export const sendCommand = (command: IHostCommandU) =>
  action(WebrtcActionTypes.SEND_COMMAND, command)

export const setSender = (send: (data: string) => void) =>
  action(WebrtcActionTypes.SET_SENDER, send)

export const incomingMessage = (msg: any /* TODO: typings?*/) =>
  action(WebrtcActionTypes.INCOMING_MESSAGE, msg)
