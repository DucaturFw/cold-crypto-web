import React from 'react'
import { connect } from 'react-redux'
import QrReqder from 'react-qr-reader'

import { setQrScanned } from '../actions'

import { Container } from './layout'

const Login = ({ setQrScanned }) => (
  <Container>
    <h1>Scan QR Code</h1>
    <QrReqder
      delay={500}
      onScan={result => result && setQrScanned(result)}
      onError={error => setQrScanned(Error(error))}
      style={{ width: "100%" }} />
  </Container>
)

export default connect(null, { setQrScanned })(Login)
