import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, mapProps } from 'recompact'
import styled from 'react-emotion'

import H1 from '../atoms/H1'
import Hr from '../atoms/Hr'
import ButtonClose from '../atoms/ButtonClose'
import Row from '../atoms/Row'
import Wallet from './Wallet'
import ModalWindow from '../organisms/ModalWindow'
import TxCreationForm from '../organisms/TxCreationForm'
import TxCreationSign from '../organisms/TxCreationSign'

import { signTxRequest } from '../../actions'
import { IState } from '../../reducers'
import { IStateGasEth, IStateTicker } from '../../reducers/blockchainsReducer'
import { IWallet } from '../../reducers/walletReducer'

interface IProps {
  blockchain: string
  gas: IStateGasEth
  ticker: IStateTicker
  wallet: IWallet
  sign: typeof signTxRequest
}

const ModalContainer = styled('div')({
  boxSizing: 'border-box',
  padding: '2rem',
})

const TxCreation = ({ gas, ticker, wallet, sign, blockchain}: IProps) =>
  <Switch>
    <Route path='/txCreation/:blockchain/:address/sign' render={() =>
      <TxCreationSign />
    } />
    <Route exact render={(props) => (
      <>
        <Wallet { ...props } /> // It use route params
        <ModalWindow>
          <ModalContainer>
            <Row>
              <H1>Send {blockchain}</H1>
              <ButtonClose />
            </Row>
            <Hr />
            <TxCreationForm
              avgWait={ gas && gas.avgWait }
              blockchain={ blockchain }
              blockchainPrice={ ticker && ticker.price_usd }
              onSubmit={(data) => sign({ data, wallet })}
            />
          </ModalContainer>
        </ModalWindow>
      </>
    )} />
  </Switch>

const withConnect = connect(({ wallet, blockchains }: IState) =>
  ({ wallet, blockchains }), { signTxRequest })

const withMapProps = mapProps(
  ({ wallet, blockchains, signTxRequest: sign, match: { params: { blockchain, address } } }) =>
    ({
      blockchain,
      gas: blockchains.gas[blockchain],
      sign,
      ticker: blockchains.ticker[blockchain],
      wallet: wallet.wallets.find((w: IWallet) => w.address === address),
    }))

export default compose(withConnect, withMapProps)(TxCreation)
