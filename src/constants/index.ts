export const handshakeServerUrl = `wss://duxi.io/shake`

export enum RTCCommands {
  webrtcLogin = 1,
  getWalletList = 2,
  signTransferTx = 3,
  signContractCall = 4,
}
