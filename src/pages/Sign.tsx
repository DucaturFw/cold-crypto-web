import * as React from 'react'
import { QrLogin } from '../components/atoms'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { sendTransaction } from '../store/qrcode/actions'

interface IPropsFromState {
  signData: string
}

interface IPropsFromDispatch {
  sendTx: typeof sendTransaction
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

const SignPage: React.SFC<AllProps> = ({ signData, sendTx }) => (
  <React.Fragment>
    <QrLogin
      title={'Sign Transaction By Mobile'}
      value={signData || ''}
      onScan={sendTx}
    />
  </React.Fragment>
)

const mapStateToProps = ({ qrcode }: IApplicationState) => ({
  signData: qrcode.signData,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendTx: (data: any) => dispatch(sendTransaction(data)),
})

export const Sign = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignPage)
