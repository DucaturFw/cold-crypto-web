import { Reducer } from 'redux'
import { IQrcodeState, QrcodeActionTypes } from './types'

const initialState: IQrcodeState = {
  error: false,
  signData: '',
}

const reducer: Reducer<IQrcodeState> = (state = initialState, action) => {
  switch (action.type) {
    case QrcodeActionTypes.SCAN_LOGIN_DATA_ERROR: {
      return { ...state, error: action.payload }
    }
    case QrcodeActionTypes.SET_SIGN_DATA: {
      return { ...state, signData: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as qrcodeReducer }
