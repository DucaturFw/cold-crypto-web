import React from 'react'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'
import {connect } from 'react-redux'
import { scanTransaction as handleScan } from '../../actions'
import { parseJsonString } from '../../helpers/json'
import { Column, Row } from '../shared/layout'
import { H2 } from '../shared/typography'
import { signTransferTx } from '../../helpers/webrtc'

class TxSigned extends React.Component<any> {
  state = {
    isScaned: false
  }
  onScan = (result) => {
    const { handleScan } = this.props
    this.setState({isScaned: true})
    handleScan(parseJsonString(result.substr(3)))
  }

  render() {
    const { value, wallet, isSending } = this.props
    const { isScaned } = this.state

    const sendData = signTransferTx(value, wallet)

    if(isSending) {
      return (
        <Row style={{ minWidth: '80vw' }}>
          <H2>Sending...</H2>
        </Row>
      )
    }

    return (
      <Row style={{ minWidth: '80vw' }}>
        <Column style={{ width: '45%', marginRight: '5%' }}>
          <H2>1. Scan this request</H2>
          <QRCode
            value={sendData}
            renderAs='svg'
            style={{width: '100%', height: '100%'}}
          />
        </Column>
        <Column style={{ width: '45%', marginLeft: '5%' }}>
          <H2>2. Show response here</H2>
          <QrReader
            delay={300}
            onScan={(result) => result && !isScaned && this.onScan(result)}
            onError={(error) => console.log(error)}
            style={{ width: '100%' }}
          />
        </Column>
      </Row>
    )
  }
}

export default connect( null, { handleScan })(TxSigned)
