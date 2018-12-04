import * as React from 'react'
import { QrLogin } from '../components/atoms'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { sendTransaction } from '../store/transport/actions'
import { IWalletBase } from '../store/wallets/types'

interface IPropsFromState {
  signTx: string
  wallet: IWalletBase
}

interface IPropsFromDispatch {
  sendTx: typeof sendTransaction
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

const SignPage: React.SFC<AllProps> = ({ signTx, sendTx, wallet }) => {
  let scaned = false
  const handleScan = (result: string) => {
    if (!scaned) {
      scaned = true
      sendTx(result, wallet)
    }
  }

  return (
    <React.Fragment>
      <QrLogin
        title={'Sign Transaction By Mobile'}
        value={signTx || ''}
        onScan={handleScan}
      />
    </React.Fragment>
  )
}

const mapStateToProps = ({ wallets }: IApplicationState) => ({
  signTx: wallets.sendingTxData.signTx!,
  wallet: wallets.item,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendTx: (data: string, wallet: IWalletBase) =>
    dispatch(sendTransaction(data, wallet)),
})

export const Sign = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignPage)
