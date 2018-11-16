import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'

import { setBlockchainGasInfo, setBlockchainTicker } from '../actions'

export interface IStateGasEth {
  average: number
  avgWait: number
  blockNum: number
  block_time: number
  fast: number
  fastWait: number
  fastest: number
  fastestWait: number
  safeLow: number
  safeLowWait: number
  speed: number
}

export interface IStateTicker {
  '24h_volume_usd': string
  available_supply: string
  id: string
  last_updated: string
  market_cap_usd: string
  max_supply: null
  name: string
  percent_change_1h: string
  percent_change_24h: string
  percent_change_7d: string
  price_btc: string
  price_usd: string
  rank: string
  symbol: string
  total_supply: string
}

const defaultStateGas = {} as { [key: string]: IStateGasEth | unknown }
const gas = createReducer({}, defaultStateGas)

const defaultStateTcker = {} as { [key: string]: IStateTicker }
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
