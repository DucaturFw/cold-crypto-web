import * as React from 'react'

import { OverflowTd, Table } from './common'
import { A } from '../../components/atoms'
import { IEthTx } from '../../store/wallets/types'

const API_URL = 'https://rinkeby.etherscan.io/tx'

export const EthTx = (txs: IEthTx[]) => {
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
        {txs.map((item: IEthTx, index: number) => (
          <tr key={index}>
            <td>{new Date(item.timeStamp * 1000).toLocaleString()}</td>
            <OverflowTd>
              <A
                target="_blank"
                // TODO: make genrator explorer url for blockchains
                href={`${API_URL}/${item.hash}`}
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
