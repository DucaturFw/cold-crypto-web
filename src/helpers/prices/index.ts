import axios from 'axios'

enum CoinmarketcapTicker {
  eth = '1027',
  eos = '1765',
}

const CoinmarketApi = (ticker: string) => 
  axios(`https://api.coinmarketcap.com/v2/ticker/${ticker}/`)
    .then(res => res.data)

export function getEth() {
  return CoinmarketApi(CoinmarketcapTicker.eth)
}

export async function getEos() {
  return CoinmarketApi(CoinmarketcapTicker.eos)
}