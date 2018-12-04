import { Reducer } from 'redux'
import { IAuthState, AuthActionTypes } from './types'
import { ActionType } from 'typesafe-actions'
import * as auth from './actions'

const initialState: IAuthState = {
  isAuth: false,
}

export type AuthAction = ActionType<typeof auth>

const reducer: Reducer<IAuthState, AuthAction> = (
  state = initialState,
  action
) => {
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
