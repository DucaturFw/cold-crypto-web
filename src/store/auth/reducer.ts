import { Reducer } from 'redux'
import { IAuthState, AuthActionTypes } from './types'

const initialState: IAuthState = {
  isAuth: false,
}

const reducer: Reducer<IAuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_SUCCESS: {
      return { ...state, isAuth: true }
    }
    case AuthActionTypes.AUTH_ERROR: {
      return { ...state, isAuth: false }
    }
    default: {
      return state
    }
  }
}

export { reducer as authReducer }
