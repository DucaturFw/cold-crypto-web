//TODO: make prod and dev url 
export const handshakeServerUrl = "ws://localhost:3077"

export enum RTCCommands {
  webrtcLogin = 1,
  getWalletList = 2,
  signTransferTx = 3,
}