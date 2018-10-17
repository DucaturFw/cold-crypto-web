import React from 'react'
import Web3 from 'web3'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'
import {connect } from 'react-redux'
import { scanTransaction as handleScan } from '../../actions'
import { parseJsonString } from '../../helpers/json'
import { ITransaction } from '../../reducers/Wallet';
import { Column, Row } from '../shared/layout'
import { H2 } from '../shared/typography'

const TxSigned = ({ value, handleScan, wallet }) => {
  const tx: ITransaction = {
    nonce: Web3.utils.toHex(wallet.nonce),
    gasPrice: Web3.utils.toWei(value.gasPrice.toString(), 'gwei'),
    to: value.to,
    value: Web3.utils.toWei(value.amount.toString()),
  }

  return (
  <Row style={{ minWidth: '80vw' }}>
    <Column style={{ width: '45%', marginRight: '5%' }}>
      <H2>1. Scan this request</H2>
      <QRCode
        value={JSON.stringify(tx)}
        renderAs='svg'
        size='100%'
      />
    </Column>
    <Column style={{ width: '45%', marginLeft: '5%' }}>
      <H2>2. Show response here</H2>
      <QrReader
        delay={300}
        onScan={(result) => result && handleScan(parseJsonString(result))}
        onError={(error) => console.log(error)}
        style={{ width: '100%' }}
      />
    </Column>
  </Row>
  )
}

export default  connect( null, { handleScan })(TxSigned)
