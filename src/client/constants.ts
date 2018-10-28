//TODO: make prod and dev url 
const url = process.env.WEBRTC_ADDR

export const handshakeServerUrl = `ws://${url}:3077`

export enum RTCCommands {
  webrtcLogin = 1,
  getWalletList = 2,
  signTransferTx = 3,
}