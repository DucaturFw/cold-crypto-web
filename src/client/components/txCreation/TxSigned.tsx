import React from 'react'
import Web3 from 'web3'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'
import {connect } from 'react-redux'
import { scanTransaction as handleScan } from '../../actions'
import { ITransaction } from '../../reducers/Wallet';

const QrImg = ({ data }: { data: string }) =>
  <QRCode value={data} renderAs='svg' size={310} />

const TxSigned = ({ handleScan, value, wallet = {nonce: 0} }) => {
  const handleOnScan = (result) => {
    try {
      const parseResult = JSON.parse(result)
      handleScan(parseResult)
    } catch (error) {
      handleScan(error)
    }
  }

  const tx: ITransaction = {
      nonce: Web3.utils.toHex(wallet.nonce),
      gasPrice: Web3.utils.toWei(value.gasPrice.toString(), 'gwei'),
      to: value.to,
      value: Web3.utils.toWei(value.amount.toString()),
    }

  return (
    <div>
      <span>Signed {JSON.stringify(tx)}</span>
      <QrImg data={JSON.stringify(tx)} />
      <QrReader
        delay={300}
        onScan={(result) => result && handleOnScan(result)}
        onError={(error) => console.log(error)}
        style={{ width: '50%' }}
      />
    </div>
  )
}

export default  connect( null, { handleScan })(TxSigned)
