import React, { Component } from 'react'
import { connect as withRouter } from 'fuse-react'
import QrReqder from 'react-qr-reader'

import { RTCHelper } from '../services/webrtc'
import { Container } from './layout'

interface Props {
  history: any
}

const mobileClient = async () => {
  const p2 = new RTCHelper('mobile')
  await p2.waitConnection()
}

class Login extends Component<Props> {

  async componentWillMount() {
    const p1 = new RTCHelper('host')
    const offer = await p1.createOffer()
    await p1.waitConnection()
    console.log(`connected (definitely, maybe)`)
    p1.dataChannel!.send("hello")
  }

  onScan = (result: string) => {
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
