import React from 'react'
import { Form } from 'react-powerplug'
import { Switch, Route } from 'fuse-react'

import { Container, Centered } from '../layout'
import TxSigned from './TxSigned'
import TxForm from './TxForm'

export interface Props {
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

const TxContainer = ({ match, blockChainData, blockChainPrice }: Props) => (
  <Container>
    <Centered>
      <h2>{ match.params.blockchain }</h2>
      <h1>New Tx { match.params.address }</h1>
      <Form initial={{ to: '', amount: '1', gasPrice: '1' }} >
        {({ input, values }) => (
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
        )}
      </Form>
    </Centered>
  </Container>
)

export default TxContainer