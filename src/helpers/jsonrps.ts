import Web3 from 'web3'
import { getTxHeaders } from './eos-tx-helpers'
import {
  IEthTxFormValues,
  IWalletEth,
  IEosTxFormValues,
} from '../store/wallets/types'

// TODO: mobile app ignore blockchain array
export const getWalletListCommand = () => {
  const params = { blockchains: ['eth', 'eos'] }
  return `getWalletList|2|${JSON.stringify(params)}`
}

export const getSignTransferTxCommand = async (
  data: IEthTxFormValues | IEosTxFormValues,
  wallet: IWalletEth
): Promise<string> => {
  let tx
  if (wallet.blockchain === 'eth') {
    tx = {
      gasPrice: Web3.utils.toWei(
        (data as IEthTxFormValues).gasPrice.toString(),
        'gwei'
      ),
      nonce: wallet.nonce,
      to: data.to,
      value: Web3.utils.toWei(data.amount.toString()),
    }
  }

  if (wallet.blockchain === 'eos') {
    const txHeaders = await getTxHeaders(wallet.chainId as string)
    tx = {
      method: 'transfer(from:name,to:name,quantity:asset,memo:string)',
      transaction: {
        ...txHeaders,
        actions: [
          {
            name: 'transfer',
            account: 'eosio.token',
            authorization: [
              {
                actor: wallet.address,
                permission: 'active',
              },
            ],
            data: {
              to: data.to,
              from: wallet.address,
              quantity: `${(+data.amount).toFixed(4) as string} EOS`,
              memo: '',
            },
          },
        ],
      },
    }
  }

  return `signTransferTx|3|${JSON.stringify({ wallet, tx })}`
}
