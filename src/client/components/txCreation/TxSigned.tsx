import React, { Fragment } from 'react'
import fetch from 'fetch-hoc'
import { Value } from 'react-powerplug'

import Web3 from 'web3'
import QrReader from 'react-qr-reader'

import QRCode from 'qrcode.react'

import { mapProps } from 'recompact'

const handleOnScan = (result) => {
  try {
    console.log(result)
  } catch (error) {
    console.log(error)
    console.log('test')
  }
}

const QrImg = ({ data }: { data: string }) =>
  <QRCode value={data} renderAs='svg' size={310} />

const TxSigned = ({ value }) => {
  return (
    <div>
      <span>Signed {JSON.stringify(value)}</span>
      <QrImg data={JSON.stringify(value)} />
      <QrReader
        delay={300}
        onScan={(result) => result && handleOnScan(result)}
        onError={(error) => console.log(error)}
        style={{ width: '50%' }}
      />
    </div>
  )
}

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
