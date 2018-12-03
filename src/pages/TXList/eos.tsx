import * as React from 'react'

import { Table } from './common'
import { IEosTx } from '../../store/wallets/types'

export const EosTX = (txs: IEosTx[]) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Act</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {txs.map((item: IEosTx, index: number) => (
          <tr key={index}>
            <td>{new Date(item.createdAt).toLocaleString()}</td>
            <td>{item.act.name}</td>
            <td>
              {item.act.name === 'transfer' &&
                `${item.act.data.from} -> ${item.act.data.to}`}
              {item.act.name === 'delegatebw' && `${item.act.data.from}`}
              {item.act.name === 'buyrambytes' && `${item.act.data.payer}`}
            </td>
            <td>
              {item.act.name === 'transfer' && `${item.act.data.quantity}`}
              {item.act.name === 'delegatebw' && (
                <React.Fragment>
                  <span>{`CPU ${item.act.data.stake_cpu_quantity}`}</span>
                  <br />
                  <span>{`RAM ${item.act.data.stake_net_quantity}`}</span>
                </React.Fragment>
              )}
              {item.act.name === 'buyrambytes' &&
                `${item.act.data.bytes} bytes`}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
