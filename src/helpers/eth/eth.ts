import callApi from '../../utils/callApi'
import Web3 from 'web3'

import { getBcNetByChainId } from '../../helpers/blockchains'
import { IAbiArgumentType, getArguments, ABI } from './eth-contracts'
import { IWallet, IWalletEth } from '../../store/wallets/types'

const web3 = new Web3()


export function getEtherscanExploreUrl(chainId: string) {
  return getBcNetByChainId('eth', chainId).explorerUrl
}

export function getWeb3(chainId: string) {
  web3.setProvider(
    new Web3.providers.WebsocketProvider(getBcNetByChainId('eth', chainId).url)
  )

  return web3
}

export async function getNonce(address: string, chainId: string): Promise<number> {
  return getWeb3(chainId).eth.getTransactionCount(address)
}

export async function sendTx(wallet: IWallet, tx: string): Promise<string> {
  const result = await getWeb3(wallet.chainId as string).eth.sendSignedTransaction(tx)

  return result.transactionHash
}

export async function getTx(address: string, chainId: string) {
  return callApi(
    'get',
    getBcNetByChainId('eth', chainId).apiExplorerUrl,
    `/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`
  )
}

export async function getInfo(wallet: IWallet) {
  const res = await getTx(wallet.address, wallet.chainId as string)
  const nonce = await getNonce(wallet.address, wallet.chainId as string)

  return {
    txs: res.result,
    nonce,
  }
}

export const getContractData = (wallet: IWalletEth, abi: ABI, method: string, args: string[]): string => {
  const inputs = getArguments(abi, method)

  return getWeb3(wallet.chainId as string).eth.abi.encodeFunctionCall({
    name: method,
    type: 'function',
    inputs,
  }, args);
}

export const convertParamsToEth = (types: IAbiArgumentType[], params: any[]): string[] => types
  .map((x,i) => [x, params[i]] as [string, any])
  .map(x => web3.eth.abi.encodeParameter(x[0], x[1]))