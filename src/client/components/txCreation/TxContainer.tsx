import React from 'react'
import { Value } from 'react-powerplug'
import { Switch, Route } from 'fuse-react'

import { IWallet } from '../../reducers/Wallet'
import { RTCHelper } from '../../services/webrtc'

import { Header } from '../shared/layout'
import TxSigned from './TxSigned'
import TxForm from './TxForm'
import TxHeader from './TxHeader'
import { Container, Centered } from '../shared/layout'

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
  wallets: IWallet[],
  webrtc: RTCHelper,
  isSending: boolean
}


const TxContainer = ({ match, blockChainData, blockChainPrice, wallets, webrtc, isSending }: IProps) => {
  const wallet = wallets.find(item => item.address === match.params.address)

  return (
    <>
      <Header />
      <Container>
        <Centered style={{ maxWidth: '80vw' }}>
          <TxHeader params={match.params}>New Tx</TxHeader>
          <br />
          <Value initial={{ to: '', amount: '1', gasPrice: '1' }} >
            {({ set, value }) => (
              <Switch>
                <Route
                  path='/txCreation/:blockchain/:address/sign'
                  component={() =>
                    <TxSigned {...{
                      address: match.params.address,
                      blockChainData,
                      blockChainPrice,
                      value,
                      wallet,
                      isSending
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
                      webrtc,
                      wallet,
                      isSending
                    }} />
                  }
                />
              </Switch>
            )}
          </Value>
        </Centered>
      </Container>
    </>
  )
}

export default TxContainer
