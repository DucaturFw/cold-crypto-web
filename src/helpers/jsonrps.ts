import Web3 from 'web3'
import { IEthTxFormValues, IWalletEth } from '../store/wallets/types'

// TODO: mobile app ignore blockchain array
export const getWalletListCommand = () => {
  const params = { blockchains: ['eth', 'eos'] }
  return `getWalletList|2|${JSON.stringify(params)}`
}

export const getSignTransferTxCommand = async (
  data: IEthTxFormValues,
  wallet: IWalletEth
) => {
  const tx = {
    gasPrice: Web3.utils.toWei(data.gasPrice.toString(), 'gwei'),
    nonce: wallet.nonce,
    to: data.to,
    value: Web3.utils.toWei(data.amount.toString()),
  }

  return `signTransferTx|3|${JSON.stringify({ wallet, tx })}`
}
