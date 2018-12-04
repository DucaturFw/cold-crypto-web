import * as React from 'react'
import { QrLogin } from '../components/atoms'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { sendTransaction } from '../store/transport/actions'
import { call as prepareCall } from '../helpers/webrtc/jsonrpc'
import { IHostCommand } from '../helpers/webrtc/hostproto'

interface IPropsFromState {
  signTx: IHostCommand<unknown[], unknown>
}

interface IPropsFromDispatch {
  sendTx: typeof sendTransaction
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

const SignPage: React.SFC<AllProps> = ({ signTx, sendTx }) => {
  const value = prepareCall(signTx.method, signTx.id, signTx.params, true)
  return (
    <React.Fragment>
      <QrLogin
        title={'Sign Transaction By Mobile'}
        value={value || ''}
        onScan={sendTx}
      />
    </React.Fragment>
  )
}

const mapStateToProps = ({ wallets }: IApplicationState) => ({
  signTx: wallets.sendingTxData.signTx!,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendTx: (data: string) => dispatch(sendTransaction(data)),
})

export const Sign = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignPage)
