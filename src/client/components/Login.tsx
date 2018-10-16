import React from 'react'
import { connect } from 'react-redux'
import QrReqder from 'react-qr-reader'

import { addWallets } from '../actions'
import { parseJsonString } from '../helpers/json'

import { Container, Centered, Column, Row } from './shared/layout'
import { H1, H2 } from './shared/typography'

const Login = (props: { addWallets: typeof addWallets }) =>
  <Container>
    <Centered>
      <Column>
        <H1>Scan QR Code</H1>
        <H2>From screen of your mobile app</H2>
        <Row>
          <QrReqder
            delay={300}
            onScan={(result) => result && props.addWallets(parseJsonString(result))}
            onError={(error) => props.addWallets(Error(error))}
            style={{ minWidth: '30vw', maxWidth: '40vw' }}
          />
        </Row>
      </Column>
    </Centered>
  </Container>

export default connect(null, { addWallets })(Login)
