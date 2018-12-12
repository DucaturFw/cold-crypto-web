import callApi from './../utils/callApi';
import Eos from "eosjs"
import { getBcNetByChainId } from '../helpers/blockchains'
import { IWalletEos } from '../store/wallets/types';

const chain = {
  main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
  jungle: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473', // jungle testnet
  sys: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
};

export const getInfo = (wallet: IWalletEos) => {
    const net = getBcNetByChainId(wallet.blockchain, wallet.chainId as string)

    return callApi(
      'GET',
      `${net.apiExplorerUrl}/v1`,
      `/history/get_actions/${wallet.address}?limit=100&skip=0`
    )
  }
;

export const getEos = (wallet: IWalletEos) => {
  const net = getBcNetByChainId(wallet.blockchain, wallet.chainId as string)

  return Eos({
    httpEndpoint: net.url,
    chainId: chain.jungle,
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