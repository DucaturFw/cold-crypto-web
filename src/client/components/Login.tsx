import React from 'react'
import { connect } from 'react-redux'
import QrReqder from 'react-qr-reader'

import { scanWallets } from '../actions'
import { parseJsonString } from '../helpers/json'
import QRCode from 'qrcode.react'
import { Container, Column, Row } from './shared/layout'
import { H1 } from './shared/typography'
import { getWalletList } from './../helpers/webrtc'

const Login = (props: { scanWallets: typeof scanWallets }) => 
  <Container>
    <Row style={{ minWidth: '80vw' }}>
        <Column style={{ width: '45%', marginRight: '5%' }}>
          <H1>Scan QR Code</H1>
          <QRCode
            value={ getWalletList() }
            renderAs='svg'
            size='100%'
          />
        </Column>
        <Column style={{ width: '45%', marginLeft: '5%' }}>
          <H1>Show qrcode</H1>
          <QrReqder
            delay={300}
            onScan={(result) => result && props.scanWallets(parseJsonString(result))}
            onError={(error) => props.scanWallets(Error(error))}
            style={{ minWidth: '30vw', maxWidth: '40vw' }}
          />
        </Column>
      </Row>
  </Container>

export default connect(null, { scanWallets })(Login)
