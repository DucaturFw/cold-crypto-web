import React from 'react'
import { connect } from 'react-redux'
import QrReqder from 'react-qr-reader'

import { addWallets } from '../actions'

import { Container } from './layout'

const Login = (props: { addWallets: typeof addWallets }) => {
  const parseScanResult = (result: string) => {
    try {
      const parseResult = JSON.parse(result);
      addWallets(parseResult)
    } catch (error) {
      addWallets(Error(error))
    }
  }
  return (
    <Container>
      <h1>Scan QR Code</h1>
      <QrReqder
        delay={300}
        onScan={(result) => result && parseScanResult(result)}
        onError={(error) => props.addWallets(Error(error))}
        style={{ width: '100%' }}
      />
    </Container>
  )
}

export default connect(null, { addWallets })(Login)
