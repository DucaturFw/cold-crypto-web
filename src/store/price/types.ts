export enum PriceActionTypes {
  PRICE_GET = '@@price/PRICE_GET',
  PRICE_SET = '@@price/PRICE_SET',
}

export interface ICurrencyPrice {
  symbol: string
  price: number
}

export interface IPriceState {
  readonly eth: number
  readonly eos: number
}
