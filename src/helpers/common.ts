import { IWallet } from "../store/wallets/types";

import { getInfo as ethInfo } from './eth';
import { getInfo as eosInfo } from './eos';

export const getBcInfo = async (wallet: IWallet) => {
  if (wallet.blockchain === 'eth') {
    return ethInfo(wallet.address)
  }

  if (wallet.blockchain === 'eos') {
    return eosInfo(wallet.address)
      .then(result => ({ txs: result.actions }))
  }

  return null
}