import React from 'react'
import fetch from 'fetch-hoc'
import { compose, mapProps } from 'recompact'
import { Form } from 'react-powerplug'
import { Switch, Route, navigate } from 'fuse-react'

import Web3 from 'web3'

const web3 = new Web3()

console.log(web3.utils)

import { Container, Centered, Column, Row } from './layout'

interface Props {
  match: {
    params: {
      blockchain: string
      address: string
    }
  }
  blockChainData: {
    average: string
    avgWait: string
  }
  blockChainPrice: string
}

const TxForm = ({ match, blockChainPrice, blockChainData, values, input }) => (
  <form onSubmit={e => e.preventDefault() || navigate('/txCreation/eth/sign')}>
    <Column>
      <input placeholder={match.params.address} {...input('to').bind} />
      <Row>
        <input required={true} placeholder='Amount' {...input('amount').bind} />
        <span>~{(Number(values.amount) * Number(blockChainPrice)).toFixed(2)}$</span>
      </Row>
      <Row>
        <span>Gas price</span>
        <input type='range' {...input('gasPrice').bind} min='1' max='100' />
        <span> {`< ${(Number(blockChainData ? blockChainData.avgWait : 1) * Number(values.gasPrice)).toFixed(2)} min`}</span>
      </Row>
      <button type='submit'>Sign</button>
    </Column>
  </form>
)

const withSignPush = fetch(
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

const TxSigned = withSignPush(({ match, blockChainPrice, blockChainData, values }) => (
  <div>Signed {JSON.stringify(values)}</div>
))

export const TxCreation = ({ match, blockChainData, blockChainPrice }: Props) => (
  <Container>
    <Centered>
      <h2>{ match.params.blockchain }</h2>
      <h1>New Tx { match.params.address }</h1>
      <Form initial={{ to: '', amount: '1', gasPrice: '1' }} >
        {({ input, values }) => (
          <div>
          <Switch>
            <Route
              path='/txCreation/:blockchain/sign'
              component={() =>
                <TxSigned { ...{ match, blockChainPrice, blockChainData, values } } />
              }
            />
            <Route
              exact
              path='/txCreation/:blockchain/:address'
              component={() =>
                <TxForm { ...{ match, blockChainPrice, blockChainData, values, input } } />
              }
            />
          </Switch> 
          </div>
        )}
      </Form>
    </Centered>
  </Container>
)

const withBlockchainData = compose(
  fetch(({ match: { params: { blockchain } } }) => `http://localhost:4443/${blockchain}/gas`),
  mapProps(props => ({ ...props, blockChainData: props.data }))
)

const withBlockchainPrice = fetch(({ match: { params: { blockchain } } }) => `http://localhost:4443/market/price/${blockchain}`)
const mapBlockchainData = mapProps(props => ({ ...props, blockChainData: props.data }))
const mapBlockchainPrice = mapProps(props => ({ ...props, blockChainPrice: props.data }))

const wrap = compose(
  withBlockchainData,
  withBlockchainPrice,
  mapBlockchainPrice
)

export default wrap(TxCreation)
