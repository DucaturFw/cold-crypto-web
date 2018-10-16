import React from 'react'
import { Link } from 'fuse-react'
import { connect } from 'react-redux'

import { IWalletDefaultState, IWallet } from '../reducers/wallet'
import { Container, Centered, Row } from './layout'
import SupportedCurrenciesList from './SupportedCurrenciesList'
import { ButtonBase, ButtonSecondary } from './shared/buttons'
import { TextInput } from './shared/inputs'

const Home = ({ wallets }: { wallets: IWallet[] }) => (
  <Container>
    <Centered>
      <Link to='/login'>
        <ButtonBase>Connect Mobile Wallet</ButtonBase>
      </Link>
      <br />
      or
      <br />
      <Row>
        <div>Login with public key:</div>
        <SupportedCurrenciesList />
        <TextInput type='text' placeholder='Address' />
        <ButtonSecondary>Add new</ButtonSecondary>
      </Row>
      <br />
      {/* { wallets && ( */}
        <Link to='/wallets'>
          <ButtonSecondary>To wallets list</ButtonSecondary>
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
