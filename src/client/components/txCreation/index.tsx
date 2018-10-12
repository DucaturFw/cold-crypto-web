import fetch from 'fetch-hoc'
import { compose, mapProps } from 'recompact'
import Web3 from 'web3'

import TxContainer from './TxContainer'

const withBlockchainData = compose(
  fetch(({ match: { params: { blockchain } } }) => `http://localhost:4443/${blockchain}/gas`),
  mapProps(props => ({ ...props, blockChainData: props.data }))
)

const withBlockchainPrice = compose(
  fetch(({ match: { params: { blockchain } } }) => `http://localhost:4443/market/price/${blockchain}`),
  mapProps(props => ({ ...props, blockChainPrice: props.data }))
)

export const withSignPush = mapProps(props => ({
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

const wrap = compose(
  withBlockchainData,
  withBlockchainPrice
)

export default wrap(TxContainer)
