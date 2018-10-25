import { IWallet, ITransaction } from '../reducers/wallet';
import Web3 from 'web3'
import { handshakeServerUrl } from '../constants'

//TODO: add supported blockchain enum
export const webrtcLogin = (sid: string) => `webrtcLogin|1|{"sid":${sid},"url":"${handshakeServerUrl}"}`
export const getWalletList = () => `getWalletList|2|[ ["eth"] ]`

export const signTransferTx = (value: any, wallet: IWallet) => {
  const tx: ITransaction = {
    nonce: wallet.nonce,
    gasPrice: Web3.utils.toWei(value.gasPrice.toString(), 'wei'),
    to: value.to,
    value: Web3.utils.toWei(value.amount),
  }
  return `signTransferTx|3|${JSON.stringify([tx, wallet])}`
}