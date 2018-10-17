import React from 'react'
import { connect } from 'react-redux'
import QrReqder from 'react-qr-reader'

import { scanWallets } from '../actions'
import { parseJsonString } from '../helpers/json'

import { Container, Centered, Column, Row } from './shared/layout'
import { H1, H2 } from './shared/typography'

const Login = (props: { scanWallets: typeof scanWallets }) =>
  <Container>
    <Centered>
      <Column>
        <H1>Scan QR Code</H1>
        <H2>From screen of your mobile app</H2>
        <Row>
          <QrReqder
            delay={300}
            onScan={(result) => result && props.scanWallets(parseJsonString(result))}
            onError={(error) => props.scanWallets(Error(error))}
            style={{ minWidth: '30vw', maxWidth: '40vw' }}
          />
        </Row>
      </Column>
    </Centered>
  </Container>

export default connect(null, { scanWallets })(Login)
