export const handshakeServerUrl = `ws://192.168.31.112:3077`

export enum RTCCommands {
  webrtcLogin = 1,
  getWalletList = 2,
  signTransferTx = 3,
  signContractCall = 4,
}
