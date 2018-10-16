import React from 'react'
import { Value } from 'react-powerplug'
import { Switch, Route } from 'fuse-react'
import { connect } from 'react-redux'
import { Container, Centered } from '../layout'
import TxSigned from './TxSigned'
import TxForm from './TxForm'
import TxHeader from './TxHeader'
import { IWallet } from '../../reducers/Wallet';

export interface IProps {
  match: {
    params: {
      blockchain: string
      address: string,
    },
  }
  blockChainData: {
    average: string
    avgWait: string,
  }
  blockChainPrice: string,
  wallets: IWallet[]
}


const TxContainer = ({ match, blockChainData, blockChainPrice, wallets }: IProps) => {
  const wallet = wallets.find(item => item.address === match.params.address)

  return (
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
                    blockChainData,
                    blockChainPrice,
                    value,
                    wallet
                  }} />
                }
              />
              <Route
                exact
                path='/txCreation/:blockchain/:address'
                component={() =>
                  <TxForm {...{
                    address: match.params.address,
                    blockChainData,
                    blockChainPrice,
                    set,
                    value,
                  }} />
                }
              />
            </Switch>
          )}
        </Value>
      </Centered>
    </Container>
  )
}

export default connect((state: any) => { return { wallets: state.wallet.wallets } }, null)(TxContainer)
