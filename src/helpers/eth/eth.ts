import callApi from '../../utils/callApi'
import Web3 from 'web3'

import { IAbiArgumentType, getArguments, ABI } from './eth-contracts';
import { IWallet } from '../../store/wallets/types';

const web3 = new Web3()

export function getWebsocketProvider(chainId: string) {
  switch (parseInt(chainId, 10)) {
    case 1:
      return 'wss://mainnet.infura.io/ws'
    case 3:
      return 'wss://ropsten.infura.io/ws'
    case 4:
      return 'wss://rinkeby.infura.io/ws'
    default:
      throw new Error('Wrogn Ethereum chainId');
  } 
}

export function getEtherscanApiUrl(chainId: string) {
  switch (parseInt(chainId, 10)) {
    case 1:
      return 'https://api.etherscan.io'
    case 3:
      return 'https://api-ropsten.etherscan.io'
    case 4:
      return 'https://api-rinkeby.etherscan.io'
    default:
      throw new Error('Wrogn Ethereum chainId');
  }
}

export function getEtherscanExploreUrl(chainId: string) {
  switch (parseInt(chainId, 10)) {
    case 1:
      return 'https://etherscan.io'
    case 3:
      return 'https://ropsten.etherscan.io'
    case 4:
      return 'https://rinkeby.etherscan.io'
    default:
      throw new Error('Wrogn Ethereum chainId');
  }
}

export function getWeb3(chainId: string) {
  web3.setProvider(
    new Web3.providers.WebsocketProvider(getWebsocketProvider(chainId))
  )

  return web3
}

export async function getNonce(address: string, chainId: string): Promise<number> {
  return getWeb3(chainId).eth.getTransactionCount(address)
}

export async function sendTx(tx: string): Promise<string> {
  const result = await web3.eth.sendSignedTransaction(tx)

  return result.transactionHash
}

export async function getTx(address: string, chainId: string | number) {
  return callApi(
    'get',
    getEtherscanApiUrl(chainId as string),
    `/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`
  )
}

export async function getInfo(wallet: IWallet) {
  const res = await getTx(wallet.address, wallet.chainId)
  const nonce = await getNonce(wallet.address, wallet.chainId as string)

  return {
    txs: res.result,
    nonce,
  }
}

export const getContractData = (abi: ABI, method: string, args: string[]): string => {
  const inputs = getArguments(abi, method)

  return web3.eth.abi.encodeFunctionCall({
    name: method,
    type: 'function',
    inputs,
  }, args);
}

export const convertParamsToEth = (types: IAbiArgumentType[], params: any[]): string[] => types
  .map((x,i) => [x, params[i]] as [string, any])
  .map(x => web3.eth.abi.encodeParameter(x[0], x[1]))