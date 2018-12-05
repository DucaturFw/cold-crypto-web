import * as React from 'react'
import { QrLogin } from '../components/atoms'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { sendTransaction } from '../store/transport/actions'
import { call as prepareCall } from '../helpers/webrtc/jsonrpc'
import { IHostCommand } from '../helpers/webrtc/hostproto'

interface IPropsFromState {
  command: IHostCommand<unknown[], unknown>
}

interface IPropsFromDispatch {
  sendTx: typeof sendTransaction
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

const SignPage: React.SFC<AllProps> = ({ command, sendTx }) => {
  const value = prepareCall(command.method, command.id, command.params, true)
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
  command: wallets.sendingTxData.command!,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendTx: (data: string) => dispatch(sendTransaction(data)),
})

export const Sign = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignPage)
