const jsonRequest = async (path: string, sub: string) => {
  const res = await fetch(`http://localhost:4443/${path}`)
  const json = await res.json()
  return sub ? json[sub] : json
}

export const fetchAvaliableCurrencies = jsonRequest('blockchains', 'supported')
