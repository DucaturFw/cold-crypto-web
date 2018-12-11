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

const TXListWrapper = styled('div')({
  background: '#fff',
  padding: '2rem',
  boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.04)',
  borderRadius: '.8rem',
})

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
                <ButtonBase style={{minWidth: '13rem'}}>Create New Tx</ButtonBase>
              </Link>
              <Link to={`/wallets/${wallet.address}/contract/create`}>
                <ButtonBase>Call Contract</ButtonBase>
              </Link>
            </Column>
            <Column style={{ display: 'flex', justifyContent: 'center' }}>
              <H1>{wallet.blockchain} Wallet</H1>
              <H2>
                <Address>{wallet.address}</Address>
              </H2>
            </Column>
          </Row>
          <Hr />
          <TXListWrapper>
            <TXList wallet={wallet} />
          </TXListWrapper>
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
