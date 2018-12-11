import * as React from 'react'
import { QrLogin } from '../components/organisms/QrLogin'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { sendTransaction } from '../store/transport/actions'
import { call as prepareCall } from '../helpers/webrtc/jsonrpc'
import { IHostCommandU } from '../helpers/webrtc/hostproto'

interface IPropsFromState {
  command: IHostCommandU
}

interface IPropsFromDispatch {
  sendTx: typeof sendTransaction
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

const SignPage: React.SFC<AllProps> = ({ command, sendTx }) => {
  let scaned = false
  const value = prepareCall(command.method, command.id, command.params, true)
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
  command: wallets.sendingTxData.command!,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendTx: (data: string) => dispatch(sendTransaction(data)),
})

export const Sign = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignPage as any)
