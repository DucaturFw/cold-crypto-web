import * as React from 'react'
import styled from 'react-emotion'

import { IEthTx, IWalletEth } from '../../store/wallets/types'

const API_URL = 'https://ropsten.etherscan.io/tx'

export const EthTx = (txs: IWalletEth) => {
  return (
    <React.Fragment>
      {txs.map((item: IEthTx, index: number) => (
        <tr key={index}>
          <td>{new Date(item.timeStamp * 1000).toLocaleString()}</td>
          <OverflowTd>
            <a
              target="_blank"
              // TODO: make genrator explorer url for blockchains
              href={`${API_URL}/${item.hash}`}
            >
              {item.hash}
            </a>
          </OverflowTd>
          <OverflowTd>{item.from}</OverflowTd>
          <td>{item.value}</td>
        </tr>
      ))}
    </React.Fragment>
  )
}

const OverflowTd = styled('td')({
  maxWidth: '20vw',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})
