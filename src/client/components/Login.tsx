import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import QrReqder from 'react-qr-reader'

import { Container } from './layout'

interface Props {
  history: any
}

class Login extends Component<Props> {

  onScan = (result: string) => {
    console.log({result})
    if (result) {
      localStorage.setItem('lastScannedAddress', result)
      this.props.history.push(`/wallet/${result}`)
    }
  }

  onError = (err: string) => alert(err)

  render() {
    return (
      <Container>
      <h1>Scan QR Code</h1>
      <QrReqder
        delay={500}
        onScan={this.onScan}
        onError={this.onError}
        style={{ width: "100%" }} />
    </Container>
    )
  }
}

export default withRouter(Login as any)
