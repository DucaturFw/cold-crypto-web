import { resolve } from 'path';

export const jsonRequest = (path: string, nested?: string) => {
   return fetch(`http://18.221.128.6:8080/${path}`)
      .then(resolve => resolve.json())
      .then(resolve => nested ? resolve[nested] : resolve)
}

// export const fetchAvaliableCurrencies = jsonRequest('blockchains', 'supported')
// export const fetchWallet = jsonRequest('addresses')
