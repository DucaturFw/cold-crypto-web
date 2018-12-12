import * as React from 'react'

import { OverflowTd, Table } from './common'
import { A } from '../../components/atoms'
import { IEthTx, IWalletEth } from '../../store/wallets/types'
import { getEtherscanExploreUrl } from '../../helpers/eth/eth'

export const EthTx = (wallet: IWalletEth) => {
  if (!wallet || !wallet.txs) {
    return null
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>TxHash</th>
          <th>Address</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {wallet.txs!.map((item: IEthTx, index: number) => (
          <tr key={index}>
            <td>{new Date(item.timeStamp * 1000).toLocaleString()}</td>
            <OverflowTd>
              <A
                target="_blank"
                // TODO: make genrator explorer url for blockchains
                href={`${getEtherscanExploreUrl(wallet.chainId as string)}/tx/${
                  item.hash
                }`}
              >
                {item.hash}
              </A>
            </OverflowTd>
            <OverflowTd>{item.from}</OverflowTd>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
