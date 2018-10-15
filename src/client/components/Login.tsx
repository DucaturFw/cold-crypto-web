import React from 'react'
import { connect } from 'react-redux'
import QrReqder from 'react-qr-reader'

import { addWallets } from '../actions'

import { Container } from './layout'

const Login = (props: { addWallets: typeof addWallets }) => {
  return (
    <Container>
      <h1>Scan QR Code</h1>
      <QrReqder
        delay={300}
        onScan={(result) => result && props.addWallets(result)}
        onError={(error) => props.addWallets(Error(error))}
        style={{ width: '100%' }}
      />
    </Container>
  )
}

export default connect(null, { addWallets })(Login)
