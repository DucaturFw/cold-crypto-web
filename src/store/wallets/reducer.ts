import { Reducer } from 'redux'
import { ActionType } from 'typesafe-actions'
import * as wallets from './actions'
import {
  IWalletsState,
  WalletsActionTypes,
  IWalletEth,
  IWalletEos,
  IEthTxFormValues,
} from './types'
import { IHostCommand } from '../../helpers/webrtc/hostproto'

const initialState: IWalletsState = {
  item: {} as IWalletEth | IWalletEos,
  items: [],
  sendingTxData: {
    signTx: {} as IHostCommand<unknown[], unknown>,
    hash: '',
    formData: {} as IEthTxFormValues,
    error: '',
  },
  errors: undefined,
  loading: false,
}

export type WalletsAction = ActionType<typeof wallets>

const reducer: Reducer<IWalletsState, WalletsAction> = (
  state = initialState,
  action
) => {
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
    case WalletsActionTypes.SET_SENDING_TX_DATA: {
      return {
        ...state,
        sendingTxData: { ...state.sendingTxData, ...action.payload },
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as walletsReducer }
