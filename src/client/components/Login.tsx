import React from 'react'
import QrReqder from 'react-qr-reader'
import { connect } from 'react-redux'

import { Header, Centered, Container, Column, Row } from './shared/layout'
import { H2 } from './shared/typography'

import { scanWallets } from '../actions'
import { parseJsonString } from '../helpers/json'
import QRCode from 'qrcode.react'
import { getWalletList } from './../helpers/webrtc'

const Login = (props: { scanWallets: typeof scanWallets }) =>
  <>
    <Header />
    <Container>
      <Row style={{ minWidth: '80vw' }}>
          <Column style={{ width: '40%', margin: '0 5%' }}>
            <Centered>
              <H2>Scan QR Code</H2>
            </Centered>
            <QRCode
              value={ getWalletList() }
              renderAs='svg'
              style={{width: '100%', height: '100%'}}
            />
          </Column>
          <Column style={{ width: '40%', margin: '0 5%' }}>
            <Centered>
              <H2>Show qrcode</H2>
            </Centered>
            <QrReqder
              delay={300}
              onScan={(result) => result && props.scanWallets(parseJsonString(result.substr(3)))}
              onError={(error) => props.scanWallets(Error(error))}
              style={{ minWidth: '30vw', maxWidth: '40vw' }}
            />
          </Column>
        </Row>
    </Container>
  </>

export default connect(null, { scanWallets })(Login)
