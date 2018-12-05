import Web3 from 'web3'
import { getTxHeaders } from './eos-tx-helpers'
import {
  IEthTxFormValues,
  IWalletEth,
  IEosTxFormValues,
  IEthContractFormValues,
  FormValues,
  IWallet,
  IWalletEos,
} from '../store/wallets/types'
import { IHostCommandU } from './webrtc/hostproto'
import { getContractData, convertParamsToEth } from './eth/eth'
import { getArguments } from './eth/eth-contracts';

export enum TxTypes {
  Transfer,
  Contract
}

// TODO: mobile app ignore blockchain array
export const getWalletListCommand = () => {
  const params = { blockchains: ['eth', 'eos'] }
  return {
    id: 2,
    method: 'getWalletList',
    params,
  }
}

export const getTxCommand = (data: FormValues, wallet: IWalletEos | IWalletEth, txType: TxTypes) =>
{
  switch (txType) {
    case TxTypes.Transfer:
      return getTransferTxCommand(data as IEthTxFormValues | IEosTxFormValues, wallet)
    case TxTypes.Contract:
      return getContractCommand(data as IEthContractFormValues, wallet as IWalletEth)
    default:
      throw new Error('tx type not found')
  }
}

function isEthTransfer(data: FormValues, wallet: IWallet): data is IEthTxFormValues | IEthContractFormValues
{
  return wallet.blockchain == 'eth'
}
function isEosTransfer(data: FormValues, wallet: IWallet): data is IEosTxFormValues
{
  return wallet.blockchain == 'eos'
}

const getTransferTxCommand = async (
  data: IEthTxFormValues | IEosTxFormValues,
  wallet: IWalletEth | IWalletEos
): Promise<IHostCommandU> => {
  let tx
  if (isEthTransfer(data, wallet))
  {
    let amount = ("amount" in data) ? data.amount : 0
    tx = {
      gasPrice: Web3.utils.toWei(
        data.gasPrice.toString(),
        'gwei'
      ),
      nonce: wallet.nonce,
      to: data.to,
      value: Web3.utils.toWei(amount.toString()),
    }
  }

  if (isEosTransfer(data, wallet)) {
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

  return { id: 3, method: 'signTransferTx', params: { wallet, tx } }
}

const getContractCommand = async ( formData: IEthContractFormValues, wallet: IWalletEth ): Promise<IHostCommandU> => {
   const tx  = {
      gasPrice: Web3.utils.toWei(formData.gasPrice.toString(), "gwei"),
      gasLimit: formData.gasLimit,
      nonce: wallet.nonce,
      to: formData.to,
      data: getContractData(formData.abi, formData.method, formData.args)
    };

    const argsTypes = getArguments(formData.abi, formData.method).map(
      item => item.type
    );
    const args = convertParamsToEth(argsTypes, formData.args);

    const abi = { method: formData.method, args };

  return { id: 4, method: 'signContractCall', params: { abi, wallet, tx } }
};