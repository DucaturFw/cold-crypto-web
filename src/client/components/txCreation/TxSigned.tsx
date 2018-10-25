import React from 'react'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'
import {connect } from 'react-redux'
import { scanTransaction as handleScan } from '../../actions'
import { Column, Row } from '../shared/layout'
import { H2 } from '../shared/typography'
import { signTransferTx } from '../../helpers/webrtc'

const TxSigned = ({ value, handleScan, wallet }) => {
  const sendData = signTransferTx(value, wallet)

  return (
  <Row style={{ minWidth: '80vw' }}>
    <Column style={{ width: '45%', marginRight: '5%' }}>
      <H2>1. Scan this request</H2>
      <QRCode
        value={sendData}
        renderAs='svg'
        size='100%'
      />
    </Column>
    <Column style={{ width: '45%', marginLeft: '5%' }}>
      <H2>2. Show response here</H2>
      <QrReader
        delay={300}
        onScan={(result) => result && handleScan(result)}
        onError={(error) => console.log(error)}
        style={{ width: '100%' }}
      />
    </Column>
  </Row>
  )
}

export default connect( null, { handleScan })(TxSigned)
