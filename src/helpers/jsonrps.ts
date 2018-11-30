// TODO: mobile app ignore blockchain array
export const getWalletListCommand = () => {
  const params = { blockchains: ['eth, eos'] }
  return `getWalletList|2|${JSON.stringify(params)}`
}
