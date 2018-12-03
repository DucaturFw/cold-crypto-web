import * as React from 'react'
import { IWalletBase, IWalletEth } from '../../store/wallets/types'

import { EthTx } from './eth'

interface IProps {
  wallet: IWalletBase | IWalletEth
}

export const TXList: React.SFC<IProps> = ({ wallet }) => {
  if (wallet.blockchain === 'eth') {
    return EthTx(wallet.txs)
  }

  return <div>hi</div>
}
