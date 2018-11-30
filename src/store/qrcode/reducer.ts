import { Reducer } from 'redux'
import { IQrcodeState, QrcodeActionTypes } from './types'

const initialState: IQrcodeState = {
  error: false,
}

const reducer: Reducer<IQrcodeState> = (state = initialState, action) => {
  switch (action.type) {
    case QrcodeActionTypes.SCAN_LOGIN_DATA_ERROR: {
      return { ...state, error: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as qrcodeReducer }
