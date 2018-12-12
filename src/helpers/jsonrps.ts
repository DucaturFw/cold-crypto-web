import Web3 from 'web3'
import { getTxHeaders } from './eos-tx-helpers'
import {
  IEthTxFormValues,
  IWalletEth,
  IEosTxFormValues,
  IEthContractFormValues,
  IWalletEos,
  IEosContractFormValues,
  IWalletBase
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

export async function getEthContractParams (formData: IEthContractFormValues, wallet: IWalletEth) {
  const tx  = {
    gasPrice: Web3.utils.toWei(formData.gasPrice.toString(), "gwei"),
    gasLimit: formData.gasLimit,
    nonce: wallet.nonce,
    to: formData.to,
    data: getContractData(wallet, formData.abi, formData.method, formData.args)
  };

  const argsTypes = getArguments(formData.abi, formData.method).map(
    item => item.type
  );
  const args = convertParamsToEth(argsTypes, formData.args);

  const abi = { method: formData.method, args };

  return Promise.resolve({ abi, wallet, tx })
};

export async function getEosContractParams (formData: IEosContractFormValues, wallet: IWalletEos) {
  const abi = Object.entries(formData.abi)
      .map((params: string[]) => params.join(':'))
      .join(',');

    const walletBase: IWalletBase = {
      address: wallet.address,
      blockchain: wallet.blockchain,
      chainId: wallet.chainId
    }

    const txHeaders = await getTxHeaders(wallet.chainId as string)
    const tx = {
      method: `${formData.method}(${abi})`,
      transaction: {
        ...txHeaders,
        actions: [
          {
            name: formData.method,
            account: formData.to,
            authorization: [
              {
                actor: wallet.address,
                permission: 'active',
              },
            ],
            data: (formData as IEosContractFormValues).data
          },
        ],
      },
    }

    return Promise.resolve({ abi, wallet: walletBase, tx })
};