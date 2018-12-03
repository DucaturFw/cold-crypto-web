import * as React from 'react'
import styled from 'react-emotion'
import { Row, H2, Column, ButtonBase, H1, Hr } from '../components/atoms'
import { Loader } from '../components/Spinner'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { addWallet } from '../store/wallets/actions'
import { IWallet, IWalletBase } from '../store/wallets/types'

import { TXList } from './TXList'

interface IPropsFromState {
  loading: boolean
  wallet: IWallet
}

interface IPropsFromDispatch {
  addWallet: typeof addWallet
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

class WalletPage extends React.Component<AllProps> {
  public componentDidMount() {
    const { wallet, addWallet: addWalletDispatch } = this.props

    addWalletDispatch(wallet)
  }

  public render() {
    const { wallet, loading } = this.props
    return (
      <React.Fragment>
        <Column>
          <Row>
            <Column style={{ flexBasis: '15rem', marginRight: '2rem' }}>
              <Link to={`/wallets/${wallet.address}/tx/create`}>
                <ButtonBase>Create New Tx</ButtonBase>
              </Link>
              <Link to={`/wallets/${wallet.address}/contract/create`}>
                <ButtonBase>Call Contract</ButtonBase>
              </Link>
            </Column>
            <Column>
              <H1>{wallet.blockchain} Wallet</H1>
              <H2>
                <Address>{wallet.address}</Address>
              </H2>
            </Column>
          </Row>
          <Hr />
          <TXList wallet={wallet} />
          {loading && <Loader />}
        </Column>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ wallets }: IApplicationState) => ({
  loading: wallets.loading,
  wallet: wallets.item,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addWallet: (wallet: IWalletBase) => dispatch(addWallet(wallet)),
})

export const Wallet = connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletPage)

const Address = styled('div')({
  fontSize: '.8rem',
  lineHeight: '1.5rem',
})
