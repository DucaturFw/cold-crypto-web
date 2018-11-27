import { ITransaction, IContract } from '../reducers/webrtcReducer'
import Web3 from 'web3'
import { handshakeServerUrl } from '../constants'
import { IWallet } from '../reducers/walletReducer'
import { getContractData, convertParamsToEth } from './ethHelper'
import { IContractSignFormData } from '../actions'
import { getArguments } from './eth-contracts'
import { ITransferTx, ITxHeaders, IContractCall } from './eos-types'
import { getTxHeaders } from './eos-tx-headers'


// TODO: add supported blockchain enum
export const webrtcLogin = (sid: string) => {
  const params = { sid, url: handshakeServerUrl}

  return `webrtcLogin|1|${JSON.stringify(params)}`
}
export const getWalletList = () => {
 const params = { blockchains: ['eth']}
 return `getWalletList|2|${JSON.stringify(params)}`
}

export const signTransferTx = async (value: IPayTx, wallet: IWallet) => {
  let tx: ITransaction | ITransferTx

  if (wallet.blockchain === 'eth')
  {
    tx = {
      gasPrice: Web3.utils.toWei(value.gasPrice, 'gwei'),
      nonce: wallet.nonce,
      to: value.to,
      value: Web3.utils.toWei(value.amount),
    }
  }
  
  if (wallet.blockchain === 'eos')
  {
    let txHeaders: ITxHeaders = await getTxHeaders(wallet.chainId as string)
    tx = {
      method: "transfer(from:name,to:name,quantity:asset,memo:string)",
      transaction: {
        ...txHeaders,
        actions: [
          {
            name: "transfer",
            account: wallet.address,
            authorization: [
              {
                actor: wallet.address,
                permission: "active"
              }
            ],
            data: {
              to: value.to,
              from: wallet.address,
              quantity: `${(+value.amount).toFixed(4) as string} EOS`,
              memo: ''
            }
          }
        ]
      }
    }
  }
  
  return `signTransferTx|3|${JSON.stringify({wallet, tx})}`
}

export const signContractCall = async (value: IContractSignFormData, wallet: IWallet) =>
{
  let callRequest: {abi?: {method: string, args: string[]}, wallet: IWallet, tx: IContract | IContractCall }
  if (wallet.blockchain == 'eth')
  {
    const tx: IContract = {
      gasPrice: Web3.utils.toWei(value.gasPrice, 'gwei'),
      gasLimit: value.gasLimit,
      nonce: wallet.nonce,
      to: value.to,
      // value: Web3.utils.toWei(value.amount),
      data: getContractData(value.abi, value.method, value.args),
    }
  
    const argsTypes = getArguments(value.abi, value.method).map(item => item.type)
    const args = convertParamsToEth(argsTypes, value.args)
    
    const abi = {method: value.method, args }
    callRequest = {abi, wallet, tx}
  }
  else if (wallet.blockchain == 'eos')
  {
    let txHeaders: ITxHeaders = await getTxHeaders(wallet.chainId as string)
    let argNames = value.method.split('(')[1].replace(')', '').split(',').map(x => x.split(':').pop())
    let argPairs = argNames.map((x,i) => [x, value.args[i]])
    let argObj = argNames.reduce((acc, [key, val]) => (acc[key] = val, acc), {})
    const tx: IContractCall = {
      method: value.method,
      transaction: {
        ...txHeaders,
        actions: [
          {
            name: value.method.split('(')[0],
            account: wallet.address,
            authorization: [
              {
                actor: wallet.address,
                permission: "active"
              }
            ],
            data: argObj
          }
        ]
      }
    }
  }
  
  return `signContractCall|4|${JSON.stringify(callRequest)}`
}

interface IPayTx {
  to: string
  gasPrice?: string | number
  amount: string | number
  abi?: any
}

interface IPayToAddressTx extends IPayTx {
  data: string
  callback: any
}

export const payToAddress = (value: IPayToAddressTx) => {
  // payToAddress|1|{"to": "0xadadad", "gasPrice": "12313", "value": "1231", "data": "0xadaa", "callback": ""}
  const tx = {
    blockchain: 'eth',
    callback: value.callback,
    data: value.data,
    gasPrice: Web3.utils.toWei(value.gasPrice, 'gwei'),
    to: value.to,
    value: Web3.utils.toWei(value.amount, 'ether'),
  }
  return `payToAddress|1|${JSON.stringify({...tx})}`
}
