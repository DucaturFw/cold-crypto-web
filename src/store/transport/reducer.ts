import { Reducer } from 'redux'
import { ITransportState, TransportActionTypes, TransportActionType } from './types'

const initialState: ITransportState = {
  qrcodeData: '',
  pushedMessages: [],
}

const reducer: Reducer<ITransportState, TransportActionType> = (state = initialState, action) => {
  switch (action.type) {
    case TransportActionTypes.SET_RTC_SID: {
      return { ...state, qrcodeData: action.payload }
    }
    case TransportActionTypes.SIGN_TX: {
      return { ...state, pushedMessages: state.pushedMessages.concat(action.payload) }
    }
    default: {
      return state
    }
  }
}

export { reducer as transportReducer }
