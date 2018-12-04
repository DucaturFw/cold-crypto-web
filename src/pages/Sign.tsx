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
  let scaned = false
  const value = prepareCall(signTx.method, signTx.id, signTx.params, true)
  const handleScan = (result: string) => {
    if (!scaned) {
      scaned = true
      sendTx(result)
    }
  }

  return (
    <React.Fragment>
      <QrLogin
        title={'Sign Transaction By Mobile'}
        value={value || ''}
        onScan={handleScan}
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
)(SignPage as any)
