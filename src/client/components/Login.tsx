import React from 'react'
import { connect } from 'react-redux'
import QrReqder from 'react-qr-reader'
import {scanWallets} from '../actions'
import { Container } from './layout'

const Login = (props) => {
  const parseScanResult = (result: string) => {
    try {
      const parseResult = JSON.parse(result);
      props.scanWallets(parseResult)
    } catch (error) {
      props.scanWallets(Error(error))
    }
  }
  return (
    <Container>
      <h1>Scan QR Code</h1>
      <QrReqder
        delay={300}
        onScan={(result) => result && parseScanResult(result)}
        onError={(error) => props.scanWallets(Error(error))}
        style={{ width: '100%' }}
      />
    </Container>
  )
}

export default connect( null, { scanWallets })(Login)

