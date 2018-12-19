import { action } from 'typesafe-actions'
import { PriceActionTypes, ICurrencyPrice } from './types'

export const priceGet = () => action(PriceActionTypes.PRICE_GET)
export const priceSet = (prices: ICurrencyPrice[]) => action(PriceActionTypes.PRICE_SET, prices)
