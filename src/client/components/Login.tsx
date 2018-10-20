import React from 'react'
import { connect } from 'react-redux'
import QrReqder from 'react-qr-reader'

import { scanWallets } from '../actions'
import { parseJsonString } from '../helpers/json'
import QRCode from 'qrcode.react'
import { Container, Centered, Column, Row } from './shared/layout'
import { H1, H2 } from './shared/typography'

const qrcodeData =  `getWalletList||[ ["eth"] ]`

const Login = (props: { scanWallets: typeof scanWallets }) => 
  <Container>
    <Row style={{ minWidth: '80vw' }}>
        <Column style={{ width: '45%', marginRight: '5%' }}>
          <H1>Scan QR Code</H1>
          <QRCode
            value={ qrcodeData }
            renderAs='svg'
            size='100%'
          />
        </Column>
        <Column style={{ width: '45%', marginLeft: '5%' }}>
          <H1>Show qrcode</H1>
          <QrReqder
            delay={300}
            onScan={(result) => result && props.scanWallets(parseJsonString(result.substr(2)))}
            onError={(error) => props.scanWallets(Error(error))}
            style={{ minWidth: '30vw', maxWidth: '40vw' }}
          />
        </Column>
      </Row>
  </Container>

export default connect(null, { scanWallets })(Login)
