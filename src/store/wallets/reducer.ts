import { Reducer } from 'redux'
import {
  IWalletsState,
  WalletsActionTypes,
  IWalletEth,
  IWalletEos,
} from './types'

const initialState: IWalletsState = {
  item: {} as IWalletEth | IWalletEos,
  items: [],
  errors: undefined,
  loading: false,
}

const reducer: Reducer<IWalletsState> = (state = initialState, action) => {
  switch (action.type) {
    case WalletsActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case WalletsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, item: action.payload }
    }
    case WalletsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case WalletsActionTypes.ADD_WALLET: {
      return { ...state, item: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as walletsReducer }
