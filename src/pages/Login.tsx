import * as React from 'react'
import { QrLogin } from '../components/atoms'

import { getWalletListCommand } from '../helpers/jsonrps'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { scanLoginSuccess } from '../store/qrcode/actions'
import { IConnectedReduxProps } from '../store'

// TODO: map errorfrom qrcode state and show if we will have it
interface IPropsFromState {}

interface IPropsFromDispatch {
  scanLoginData: typeof scanLoginSuccess
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

const LoginPage: React.SFC<AllProps> = ({ scanLoginData }) => {
  return (
    <QrLogin
      title={'Mobile Login'}
      value={getWalletListCommand()}
      onScan={scanLoginData}
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  scanLoginData: (data: string) => dispatch(scanLoginSuccess(data)),
})

export const Login = connect(
  null,
  mapDispatchToProps
)(LoginPage)
