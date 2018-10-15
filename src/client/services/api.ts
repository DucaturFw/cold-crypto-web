const jsonRequest = (path: string, nested?: string) => async () => {
  const res = await fetch(`http://localhost:4443/${path}`)
  const json = await res.json()
  return nested ? json[nested] : json
}

// export const fetchAvaliableCurrencies = jsonRequest('blockchains', 'supported')
export const fetchWallet = jsonRequest('addresses')
