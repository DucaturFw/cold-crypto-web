import React from 'react'
import { Link } from 'fuse-react'
import { connect } from 'react-redux'

import { IWalletDefaultState, IWallet } from '../reducers/wallet'
import SupportedCurrenciesList from './SupportedCurrenciesList'

import { Container, Centered, Row, Header } from './shared/layout'
import { Separator, JustSeparator } from './shared/typography'
import { ButtonBase, ButtonSecondary, ButtonWarning } from './shared/buttons'
import { TextInput } from './shared/inputs'

const Home = ({ wallets }: { wallets: IWallet[] }) => (
  <>
    <Header to='/' />
    <Container>
      <Centered>
        <Link to='/login'>
          <ButtonBase>Login using QR code</ButtonBase>
        </Link>
        <Row>
          <Separator>or</Separator>
        </Row>
        <Row>
          <TextInput type='text' placeholder='Type your wallet address here' />
          <SupportedCurrenciesList supported={['eth']}/>
        </Row>
        <Row>
          <ButtonSecondary>Login with address</ButtonSecondary>
        </Row>
        <Row>
          <JustSeparator />
        </Row>
        <Link to='/webrtc'>
          <ButtonWarning>Webrtc login</ButtonWarning>
        </Link>
      </Centered>
    </Container>
  </>
)

interface IProps {
  wallet: IWalletDefaultState
}

const withConnect = connect(({ wallet: { wallets } }: IProps) => ({ wallets }))

export default withConnect(Home)
