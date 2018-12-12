import { ActionType } from 'typesafe-actions'
import * as webrtc from './actions'
import { Reducer } from 'redux'
import { IWebrtcState, WebrtcActionTypes } from './types'
import { getSingleton } from '../../helpers/webrtc/webrtcsingleton'

const initialState: IWebrtcState = {
  rtc: getSingleton().rtc,
  send: data => getSingleton().rtc.dataChannel!.send(data),
  connected: getSingleton().connected,
  status: '',
  pushedMessages: [],
}

const reducer: Reducer<IWebrtcState, ActionType<typeof webrtc>> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case WebrtcActionTypes.CONNECTION_OPEN: {
      return { ...state, connected: true }
    }
    case WebrtcActionTypes.CONNECTION_CLOSE: {
      return { ...state, connected: false }
    }
    case WebrtcActionTypes.SET_STATUS: {
      return { ...state, status: action.payload }
    }
    case WebrtcActionTypes.SET_SENDER: {
      return { ...state, send: action.payload }
    }
    case WebrtcActionTypes.SEND_COMMAND: {
      return {
        ...state,
        pushedMessages: [...state.pushedMessages, action.payload],
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as webrtcReducer }
