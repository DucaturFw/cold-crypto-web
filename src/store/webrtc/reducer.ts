import { Reducer } from 'redux'
import { IWebrtcState, WebrtcActionTypes } from './types'
import { singleton } from '../../helpers/webrtc/webrtcsingleton'

const initialState: IWebrtcState = {
  rtc: singleton.rtc,
  connected: singleton.connected,
}

const reducer: Reducer<IWebrtcState> = (state = initialState, action) => {
  switch (action.type) {
    case WebrtcActionTypes.Webrtc_SUCCESS: {
      return { ...state, isWebrtc: true }
    }
    default: {
      return state
    }
  }
}

export { reducer as webrtcReducer }
