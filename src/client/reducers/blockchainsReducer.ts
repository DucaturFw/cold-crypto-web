import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'

import { setBlockchainGasInfo, setBlockchainTicker } from '../actions'

const defaultStateGas = {} as { [key: string]: object }
const gas = createReducer({}, defaultStateGas)

const defaultStateTcker = {} as { [key: string]: object }
const ticker = createReducer({}, defaultStateTcker)

gas.on(setBlockchainGasInfo, (state, { key, value }) =>
  ({ ...state, [key]: value }))

ticker.on(setBlockchainTicker, (state, { key, value }) =>
  ({ ...state, [key]: value }))

export interface IState {
  gas: typeof defaultStateGas
  ticker: typeof defaultStateTcker
}

export default combineReducers({ gas, ticker })
