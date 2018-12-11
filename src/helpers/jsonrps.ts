import Web3 from 'web3'
import { getTxHeaders } from './eos-tx-helpers'
import {
  IEthTxFormValues,
  IWalletEth,
  IEosTxFormValues,
  IEthContractFormValues,
  IWalletEos,
} from '../store/wallets/types'
import { getContractData, convertParamsToEth } from './eth/eth'
import { getArguments } from './eth/eth-contracts';

// TODO: mobile app ignore blockchain array
export const getWalletListCommand = () => {
  const params = { blockchains: ['eth', 'eos'] }
  return {
    id: 2,
    method: 'getWalletList',
    params,
  }
}


export async function getEthTransferTx(form: IEthTxFormValues, wallet: IWalletEth)
{
  return Promise.resolve({
    gasPrice: Web3.utils.toWei(form.gasPrice.toString(), 'gwei'),
    nonce: wallet.nonce,
    to: form.to,
    value: Web3.utils.toWei(form.amount.toString()),
  })
}

export async function getEosTransferTx(data: IEosTxFormValues, wallet: IWalletEos)
{
  const txHeaders = await getTxHeaders(wallet.chainId as string)
  return {
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

export async  function getEthContractParams (formData: IEthContractFormValues, wallet: IWalletEth) {
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

  return Promise.resolve({ abi, wallet, tx })
};