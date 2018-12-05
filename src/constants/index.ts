export const handshakeServerUrl = `wss://duxi.io/shake` // `ws://localhost:3077`

export enum RTCCommands {
  webrtcLogin = 1,
  getWalletList = 2,
  signTransferTx = 3,
  signContractCall = 4,
}
