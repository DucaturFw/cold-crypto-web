import { Reducer } from 'redux'
import { ITransportState, TransportActionTypes } from './types'

const initialState: ITransportState = {
  qrcodeData: '',
}

const reducer: Reducer<ITransportState> = (state = initialState, action) => {
  switch (action.type) {
    case TransportActionTypes.SET_RTC_SID: {
      return { ...state, qrcodeData: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as transportReducer }
