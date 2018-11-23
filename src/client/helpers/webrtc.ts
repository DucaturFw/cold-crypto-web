import { ITransaction, IContract } from '../reducers/webrtcReducer'
import Web3 from 'web3'
var ethAbi = require('ethereumjs-abi')
import { handshakeServerUrl } from '../constants'
import { IWallet } from '../reducers/walletReducer'
import { getContractData, convertParamsToEth } from '../services/ethHelper';
import { IContractSignFormData } from '../actions';
import { getPublicMethodNames, methodSignature, getArguments, IAbiArgumentType } from './eth-contracts';

// TODO: add supported blockchain enum
export const webrtcLogin = (sid: string) => {
  const params = { sid, url: handshakeServerUrl}

  return `webrtcLogin|1|${JSON.stringify(params)}`
}
export const getWalletList = () => {
 const params = { blockchains: ['eth']}
 return `getWalletList|2|${JSON.stringify(params)}`
}

export const signTransferTx = (value: IPayTx, wallet: IWallet) => {
  const tx: ITransaction = {
    gasPrice: Web3.utils.toWei(value.gasPrice, 'gwei'),
    nonce: wallet.nonce,
    to: value.to,
    value: Web3.utils.toWei(value.amount),
  }
  return `signTransferTx|3|${JSON.stringify({wallet, tx})}`
}

export const signContractCall = (value: IContractSignFormData, wallet: IWallet) => {
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
  
  console.log('abi', abi)
  return `signContractCall|4|${JSON.stringify({abi, wallet, tx})}`
}

interface IPayTx {
  to: string
  gasPrice: string | number
  amount: string | number
  abi: any
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
