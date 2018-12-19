import { Reducer } from 'redux'
import { IPriceState, PriceActionTypes, ICurrencyPrice } from './types'
import { ActionType } from 'typesafe-actions'
import * as price from './actions'

const initialState: IPriceState = {
  eth: 0,
  eos: 0
}

export type PriceAction = ActionType<typeof price>

const reducer: Reducer<IPriceState, PriceAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PriceActionTypes.PRICE_SET: {
      const prices = {}
      action.payload.map((item: ICurrencyPrice) => prices[item.symbol] = item.price)

      return {
        ...state,
        ...prices
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as priceReducer }
