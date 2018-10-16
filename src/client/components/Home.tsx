import React from 'react'
import { Link } from 'fuse-react'
import { connect } from 'react-redux'

import { IWalletDefaultState, IWallet } from '../reducers/wallet'
import SupportedCurrenciesList from './SupportedCurrenciesList'

import { Container, Centered, Row } from './shared/layout'
import { ButtonBase, ButtonSecondary, ButtonWarning } from './shared/buttons'
import { TextInput } from './shared/inputs'

const Home = ({ wallets }: { wallets: IWallet[] }) => (
  <Container>
    <Centered>
      <Link to='/login'>
        <ButtonBase>Connect Mobile Wallet</ButtonBase>
      </Link>
      <Row>
        or
      </Row>
      <Row>
        <TextInput type='text' placeholder='Type your wallet address here' />
        <SupportedCurrenciesList />
      </Row>
      <Row>
        <ButtonSecondary>Add new</ButtonSecondary>
      </Row>
      {/* { wallets && ( */}
        <Link to='/wallets'>
          <ButtonWarning>To wallets list</ButtonWarning>
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
