// TODO: make prod and dev url
const url =  "139.59.184.152"

export const handshakeServerUrl = `ws://${url}:3077`

export enum RTCCommands {
  webrtcLogin = 1,
  getWalletList = 2,
  signTransferTx = 3,
  signContractCall = 4,
}
