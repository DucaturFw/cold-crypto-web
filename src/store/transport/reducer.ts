import { ActionType } from 'typesafe-actions'
import { Reducer } from 'redux'
import * as transports from './actions'
import { ITransportState, TransportActionTypes } from './types'

const initialState: ITransportState = {
  qrcodeData: '',
}
export type TransportsAction = ActionType<typeof transports>

const reducer: Reducer<ITransportState, TransportsAction> = (
  state = initialState,
  action
) => {
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
