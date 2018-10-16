/* TODO: Rewrite it to sagas */
import React from 'react'
import fetch from 'fetch-hoc'

import Web3 from 'web3'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'
import { mapProps } from 'recompact'

import { Column, Row } from '../shared/layout'
import { H2 } from '../shared/typography'

const handleOnScan = (result) => {
  try {
    console.log(result)
  } catch (error) {
    console.log(error)
    console.log('test')
  }
}

const TxSigned = ({ value }) =>
  <Row style={{ minWidth: '80vw' }}>
    <Column style={{ width: '45%', marginRight: '5%' }}>
      <H2>1. Scan this request</H2>
      <QRCode
        value={JSON.stringify(value)}
        renderAs='svg'
        size='100%'
      />
    </Column>
    <Column style={{ width: '45%', marginLeft: '5%' }}>
      <H2>2. Show response here</H2>
      <QrReader
        delay={300}
        onScan={(result) => result && handleOnScan(result)}
        onError={(error) => console.log(error)}
        style={{ width: '100%' }}
      />
    </Column>
  </Row>

const withSignPush = mapProps((props) => ({
  ...props,
  withSignPush: fetch(
    'http://localhost:4443/eth/pushTx',
    ({ value: { gasPrice, to, amount } }) => ({
      body: JSON.stringify({
        chainId: 1,
        data: '0x',
        gasLimit: '0x5208',
        gasPrice: Web3.utils.toWei(gasPrice, 'gwei'),
        nonce: Web3.utils.toHex(Date.now()),
        to,
        value: Web3.utils.toWei(amount.toString()),
      }),
      method: 'POST',
    }),
  ),
}))

export default withSignPush(TxSigned)
