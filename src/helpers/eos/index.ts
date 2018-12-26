import axios from 'axios'
import Eos from "eosjs"
import { getBcNetByChainId } from '../blockchains'
import { IWalletEos } from '../../store/wallets/types';

export { EosContract } from './contract'

export const getInfo = (wallet: IWalletEos) => {
    const net = getBcNetByChainId(wallet.blockchain, wallet.chainId as string)

    if (net.sign === 'testnet') {
      return axios.get(`${net.apiExplorerUrl}/v1/history/get_actions/${wallet.address}?limit=100&skip=0`)
        .then(res => res.data)
        .then(result => ({ txs: result.actions }))
    }

    return axios.post(
      `${net.apiExplorerUrl}/v1/history/get_actions`,
      {
        account_name: wallet.address,
        offset: -100,
        pos: -1
      }
    ).then(res => res.data)
    .then(result => ({ txs: result.actions.map((item: any) => item.action_trace) }))
  }
;

export const getEos = (wallet: IWalletEos) => {
  const net = getBcNetByChainId(wallet.blockchain, wallet.chainId as string)

  return Eos({
    httpEndpoint: net.url,
    chainId: wallet.chainId,
  })
}

export const sendTx = async (wallet: IWalletEos, signedTx: string) => {
  const eos = getEos(wallet);
  const txHash = await eos.pushTransaction(signedTx);
  console.log('txHash:', txHash)

  return txHash.transaction_id
}

export async function getTxHeaders(wallet: IWalletEos)
{
  const eos = getEos(wallet);

  const info = await eos.getInfo({})

  const expireInSeconds = 60 * 60 // 1 hour

  const chainDate = new Date(info.head_block_time + 'Z')
  const expiration = new Date(chainDate.getTime() + expireInSeconds * 1000).toISOString().split('.')[0]

  const block = await eos.getBlock(info.last_irreversible_block_num)

  const transactionHeaders = {
    expiration,
    ref_block_num: info.last_irreversible_block_num & 0xFFFF,
    ref_block_prefix: block.ref_block_prefix
  }

  return transactionHeaders
}