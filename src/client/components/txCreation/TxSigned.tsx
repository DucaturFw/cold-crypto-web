import React from 'react'
import Web3 from 'web3'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'
import {connect } from 'react-redux'
import { scanTransaction as handleScan } from '../../actions'
import { ITransaction } from '../../reducers/Wallet';
import { Column, Row } from '../shared/layout'
import { H2 } from '../shared/typography'

const TxSigned = ({ value, handleScan, wallet }) => {
  const tx: ITransaction = {
    nonce: wallet.nonce,
    gasPrice: Web3.utils.toWei(value.gasPrice.toString(), 'wei'),
    to: value.to,
    value: parseInt(Web3.utils.toWei(value.amount)),
  }

  const sendData = `signTransferTx|3|${JSON.stringify([tx, wallet])}`

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
