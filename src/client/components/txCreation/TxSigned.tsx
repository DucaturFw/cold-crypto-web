import React from 'react'
import fetch from 'fetch-hoc'
import Web3 from 'web3'
import { mapProps } from 'recompact'

const TxSigned = ({ values }) => (
  <div>Signed {JSON.stringify(values)}</div>
)

const withSignPush = mapProps(props => ({
  ...props,
  withSignPush: fetch(
    'http://localhost:4443/eth/pushTx',
    ({ values }) => ({
      method: 'POST',
      body: JSON.stringify({
        nonce: Web3.utils.toHex(Date.now()),
        gasPrice: Web3.utils.toWei(values.gasPrice, 'gwei'),
        gasLimit: "0x5208",
        to: values.to,
        value: Web3.utils.toWei(values.amount.toString()),
        data: "0x",
        chainId: 1,
      })
    })
  )
}))

export default withSignPush(TxSigned)
