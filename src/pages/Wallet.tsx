import * as React from 'react'
import styled from 'react-emotion'
import { Row, H2, Column, ButtonBase, H1, Hr } from '../components/atoms'
import { Loader } from '../components/Spinner'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { addWallet } from '../store/wallets/actions'
import {
  IWallet,
  IEthTx,
  IWalletEth,
  IWalletBase,
} from '../store/wallets/types'

interface IPropsFromState {
  loading: boolean
  wallet: IWallet
}

interface IPropsFromDispatch {
  addWallet: typeof addWallet
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

class WalletPage extends React.Component<AllProps, any> {
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
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>TxHash</th>
                <th>Address</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{renderTxs(wallet.txs)}</tbody>
          </Table>
          {loading && <Loader />}
        </Column>
      </React.Fragment>
    )
  }
}

const renderTxs = (txs: IWalletEth) => {
  if (!txs) return
  return (
    <React.Fragment>
      {txs.map((item: IEthTx, index: number) => (
        <tr key={index}>
          <td>{new Date(item.timeStamp * 1000).toLocaleString()}</td>
          <OverflowTd>
            <a
              target="_blank"
              // TODO: make genrator explorer url for blockchains
              href={`https://rinkeby.etherscan.io/tx/${item.hash}`}
            >
              {item.hash}
            </a>
          </OverflowTd>
          <OverflowTd>{item.from}</OverflowTd>
          <td>{item.value}</td>
        </tr>
      ))}
    </React.Fragment>
  )
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

export const Table = styled('table')({
  borderCollapse: 'collapse',
  borderSpacing: 0,
  td: {
    color: '#2e3d3f',
    padding: '1rem .5rem',
  },
  th: {
    color: '#457b9d',
    padding: '.5rem',
  },
  tr: {
    borderBottom: '1px solid #b2bcb9',
  },
  width: '100%',
})

const OverflowTd = styled('td')({
  maxWidth: '20vw',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const Address = styled('div')({
  fontSize: '.8rem',
  lineHeight: '1.5rem',
})
