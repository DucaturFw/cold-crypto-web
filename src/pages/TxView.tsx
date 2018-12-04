import { H1, H2, Row, ButtonClose, Hr } from '../components/atoms'
import styled from 'react-emotion'
import * as React from 'react'
import { connect } from 'react-redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { ISendingTxData, IWalletBase } from '../store/wallets/types'

interface IPropsFromState {
  sendingData: ISendingTxData
  wallet: IWalletBase
}

type AllProps = IPropsFromState & IConnectedReduxProps

const getExplrUrl = (bc: string, hash: string | undefined) => {
  switch (bc) {
    case 'eth':
      return `https://ropsten.etherscan.io/tx/${hash}`
    case 'eos':
      return `https://jungle.eospark.com/tx/${hash}`
    default:
      return ''
  }
}

const TxViewPage: React.SFC<AllProps> = ({
  sendingData: { formData, hash, error },
  wallet,
}) => {
  return (
    <React.Fragment>
      <Row>
        <H1>Tx sent result</H1>
        <ButtonClose />
      </Row>
      <Hr />
      {error ? (
        <H2>Error : {error}</H2>
      ) : (
        <div>
          <H2>To : {formData!.to}</H2>
          <a target="_blank" href={getExplrUrl(wallet.blockchain, hash)}>
            {hash}
          </a>
        </div>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = ({ wallets }: IApplicationState) => ({
  sendingData: wallets.sendingTxData,
  wallet: wallets.item,
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
