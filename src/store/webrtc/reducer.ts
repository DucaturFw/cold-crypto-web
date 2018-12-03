import { Reducer } from 'redux'
import { IWebrtcState, WebrtcActionTypes } from './types'
import { singleton } from '../../helpers/webrtc/webrtcsingleton'

const initialState: IWebrtcState = {
  rtc: singleton.rtc,
  connected: singleton.connected,
  status: '',
}

const reducer: Reducer<IWebrtcState> = (state = initialState, action) => {
  switch (action.type) {
    case WebrtcActionTypes.CONNECTION_SUCCESS: {
      return { ...state, connected: true }
    }
    case WebrtcActionTypes.SET_STATUS: {
      return { ...state, status: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as webrtcReducer }
