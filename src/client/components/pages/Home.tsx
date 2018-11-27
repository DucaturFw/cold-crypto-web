import React from 'react'
import { connect } from 'react-redux'

import ModalLayout from '../layouts/Modal'
import H2 from '../atoms/H2'
import H3 from '../atoms/H3'
import Hr from '../atoms/Hr'
import ButtonBase from '../atoms/ButtonBase'
import ButtonSecondary from '../atoms/ButtonSecondary'
import TextInput from '../atoms/TextInput'
import Row from '../atoms/Row'
import Column from '../atoms/Column'
import Link from '../atoms/Link'
import SupportedCurrenciesList from '../SupportedCurrenciesList'

import { IState } from '../../reducers'

const Home = ({ sid }: { sid: IState['webrtc']['sid'] }) => (
  <ModalLayout>
    <H2>Welcome Back!</H2>
    <H3>Sign in to your wallet below</H3>
    <Hr/>

    <Row>
      <Column style={{ width: '50%', display: 'flex', justifyContent: 'center', paddingRight: '1rem' }}>
        <Row>
          <Link to='/login'>
            <ButtonBase>Login using QR code</ButtonBase>
          </Link>
        </Row>
        <Row>
          <Link to='/webrtc'>
            <ButtonSecondary>Webrtc login</ButtonSecondary>
          </Link>
        </Row>
      </Column>
      <Column style={{ width: '50%' }}>
        <Row>
          <TextInput type='text' placeholder='Type your wallet address here' />
          <SupportedCurrenciesList supported={['eth']}/>
        </Row>
        <Row>
          <ButtonSecondary>Login with address</ButtonSecondary>
        </Row>
      </Column>
    </Row>
    <Hr />
    { sid && <small>Connected as <mark>{sid}</mark></small> }
  </ModalLayout>
)

const withConnect = connect(({ webrtc: { sid } }: IState) => ({ sid }))
export default withConnect(Home)
