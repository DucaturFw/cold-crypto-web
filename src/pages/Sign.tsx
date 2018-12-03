import * as React from 'react'
import { QrLogin } from '../components/atoms'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { sendTransaction } from '../store/transport/actions'

interface IPropsFromState {
  signTx: string
}

interface IPropsFromDispatch {
  sendTx: typeof sendTransaction
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

const SignPage: React.SFC<AllProps> = ({ signTx, sendTx }) => (
  <React.Fragment>
    <QrLogin
      title={'Sign Transaction By Mobile'}
      value={signTx || ''}
      onScan={sendTx}
    />
  </React.Fragment>
)

const mapStateToProps = ({ wallets }: IApplicationState) => ({
  signTx: wallets.signTx,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendTx: (data: any) => dispatch(sendTransaction(data)),
})

export const Sign = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignPage)
