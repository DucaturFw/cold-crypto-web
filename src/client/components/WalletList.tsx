import React from 'react'
import { Link } from 'fuse-react'
import { compose } from 'recompact'
import fetch from 'fetch-hoc'

import { Container, Column } from './layout'
import { connect } from 'react-redux'
import { IWalletDefaultState, IWallet } from '../reducers/wallet'

const WalletList = ({ wallets }: { wallets: IWallet[] }) =>
  <Container>
    <Column>
      {wallets.map((v) => (
        <Link
          to={`/wallet/${v.blockchain}/${v.address}`}
          key={v.address}
        >{`${v.blockchain}: ${v.address}`}</Link>
      ))}
    </Column>
  </Container>

interface IProps {
  wallet: IWalletDefaultState
}

const withFetch = fetch('http://localhost:4443/addresses')
const withConnect = connect(({ wallet: { wallets } }: IProps) => ({ wallets }))

export default compose(withFetch, withConnect)(WalletList)
