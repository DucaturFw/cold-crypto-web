import { Header } from '../components/layouts/Header'
import { Centered, Column, H1, H2 } from '../components/atoms'
import styled from 'react-emotion'
import * as React from 'react'
import { connect } from 'react-redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { ISendingTxData } from '../store/wallets/types'

interface IPropsFromState {
  sendingData: ISendingTxData
}

type AllProps = IPropsFromState & IConnectedReduxProps

const TxViewPage: React.SFC<AllProps> = ({
  sendingData: { formData, hash },
}) => (
  <React.Fragment>
    <Header to="/" />
    <Container>
      <Centered>
        <Column>
          <H1>Tx sent result</H1>
          {/* {error ? (
            <H2>{error}</H2>
          ) : ( */}
          <>
            {formData!.to && <H2>To : {formData!.to}</H2>}
            <H2>Tx hash : {hash}</H2>
            <a target="_blank" href={`https://rinkeby.etherscan.io/tx/${hash}`}>
              {hash}
            </a>
          </>
          {/* )} */}
        </Column>
      </Centered>
    </Container>
  </React.Fragment>
)

const mapStateToProps = ({ wallets }: IApplicationState) => ({
  sendingData: wallets.sendingTxData,
})

export const TxView = connect(mapStateToProps)(TxViewPage)

export const Container = styled('main')({
  alignItems: 'center',
  background: '#f1faee',
  display: 'flex',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 8rem - 4vh)',
  width: '100vw',
})
