import React from 'react'
import { Link } from 'fuse-react'
import { connect } from 'react-redux'

import { IWalletDefaultState, IWallet } from '../reducers/wallet'
import { Container, Centered, Row } from './layout'
import SupportedCurrenciesList from './SupportedCurrenciesList'

const Home = ({ wallets }: { wallets: IWallet[] }) => (
  <Container>
    <Centered>
      <Link to='/login'>
        <button>Login with Cold Crypto Mobile App</button>
      </Link>
      <br />
      or
      <br />
      <Row>
        <div>Login with public key:</div>
        <SupportedCurrenciesList />
        <input type='text' placeholder='Address' />
        <button>Add</button>
      </Row>
      <br />
      {/* { wallets && ( */}
        <Link to='/wallets'>
          <button>To wallets list</button>
        </Link>
      {/* ) } */}
    </Centered>
  </Container>
)

interface IProps {
  wallet: IWalletDefaultState
}

const withConnect = connect(({ wallet: { wallets } }: IProps) => ({ wallets }))

export default withConnect(Home)
