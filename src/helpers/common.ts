import { IWallet } from "../store/wallets/types"

import { getInfo as ethInfo } from './eth/eth'
import { getInfo as eosInfo } from './eos'

export const getBcInfo = async (wallet: IWallet) => {
  if (wallet.blockchain === 'eth') {
    return ethInfo(wallet)
  }

  if (wallet.blockchain === 'eos') {
    return eosInfo(wallet)
  }

  throw new Error(`blockchain ${wallet.blockchain} is not supported!`)
}