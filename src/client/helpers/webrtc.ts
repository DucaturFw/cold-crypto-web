import { IWallet, ITransaction } from '../reducers/wallet'
import Web3 from 'web3'
import { handshakeServerUrl } from '../constants'

// TODO: add supported blockchain enum
export const webrtcLogin = (sid: string) => {
  const params = { sid, url: handshakeServerUrl}

  return `webrtcLogin|1|${JSON.stringify(params)}`
}
export const getWalletList = () => {
 const params = { blockchains: ['eth']}
 return `getWalletList|2|${JSON.stringify(params)}`
}

export const signTransferTx = (value: any, wallet: IWallet) => {
  const tx: ITransaction = {
    gasPrice: Web3.utils.toWei(value.gasPrice, 'gwei'),
    nonce: wallet.nonce,
    to: value.to,
    value: Web3.utils.toWei(value.amount),
  }
  return `signTransferTx|3|${JSON.stringify({wallet, tx})}`
}

export const payToAddress = (value: any) => {
  // payToAddress|1|{"to": "0xadadad", "gasPrice": "12313", "value": "1231", "data": "0xadaa", "callback": ""}
  const tx = {
    gasPrice: Web3.utils.toWei(value.gasPrice, 'gwei'),
    to: value.to,
    value: Web3.utils.toWei(value.amount, 'ether'),
    data: Web3.utils.toHex(value.data),
    callback: "https://rinkeby.etherscan.io/tx",
    blockchain: 'eth'
  }
  return `payToAddress|1|${JSON.stringify({...tx})}`
}