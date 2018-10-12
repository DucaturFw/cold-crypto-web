import React from 'react'
import { Value } from 'react-powerplug'
import { Switch, Route } from 'fuse-react'

import { Container, Centered } from '../layout'
import TxSigned from './TxSigned'
import TxForm from './TxForm'
import TxHeader from './TxHeader'

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
      <TxHeader params={match.params}>New Tx</TxHeader>
      <Value initial={{ to: '', amount: '1', gasPrice: '1' }} >
        {({ set, value }) => (
          <Switch>
            <Route
              path='/txCreation/:blockchain/sign'
              component={() =>
                <TxSigned {...{
                  address: match.params.address,
                  blockChainPrice,
                  blockChainData,
                  value
                }} />
              }
            />
            <Route
              exact
              path='/txCreation/:blockchain/:address'
              component={() =>
                <TxForm {...{
                  address: match.params.address,
                  blockChainPrice,
                  blockChainData,
                  value,
                  set
                }} />
              }
            />
          </Switch>
        )}
      </Value>
    </Centered>
  </Container>
)

export default TxContainer