import fetch from 'fetch-hoc'
import { compose, mapProps } from 'recompact'

import TxContainer from './TxContainer'

const withBlockchainData = compose(
  fetch(({ match: { params: { blockchain } } }) => `http://localhost:4443/${blockchain}/gas`),
  mapProps(props => ({ ...props, blockChainData: props.data }))
)

const withBlockchainPrice = compose(
  fetch(({ match: { params: { blockchain } } }) => `http://localhost:4443/market/price/${blockchain}`),
  mapProps(props => ({ ...props, blockChainPrice: props.data }))
)

const wrap = compose(
  withBlockchainData,
  withBlockchainPrice
)

export default wrap(TxContainer)
