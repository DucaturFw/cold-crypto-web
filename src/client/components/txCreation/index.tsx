import fetch from 'fetch-hoc'
import { connect } from 'react-redux'
import { compose, mapProps } from 'recompact'

import TxContainer from './TxContainer'


const withBlockchainData = compose(
  fetch(({ match: { params: { blockchain } } }) => `https://ethgasstation.info/json/ethgasAPI.json`),
  mapProps((props) => ({ ...props, blockChainData: props.data })),
)

const withBlockchainPrice = compose(
  fetch(({ match: { params: { blockchain } } }) => `https://api.coinmarketcap.com/v1/ticker/ethereum/`),
  mapProps((props) => ({ ...props, blockChainPrice: (props.data && props.data[0] && props.data[0].price_usd) || 0 })),
)

const wrap = compose(
  withBlockchainData,
  withBlockchainPrice,
)

export default wrap(TxContainer)
