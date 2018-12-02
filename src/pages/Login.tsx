import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router-dom'

import { QrLogin } from '../components/atoms'

import { getWalletListCommand } from '../helpers/jsonrps'
import { scanLoginSuccess } from '../store/qrcode/actions'
import { IConnectedReduxProps } from '../store'

// TODO: map errorfrom qrcode state and show if we will have it
interface IPropsFromState {}

interface IPropsFromDispatch {
  scanLoginData: typeof scanLoginSuccess
}

type AllProps = IPropsFromState &
  IPropsFromDispatch &
  IConnectedReduxProps &
  RouteComponentProps

const LoginPage: React.SFC<AllProps> = props => {
  const { scanLoginData } = props

  // TODO: add back url to push
  // const { location } = props
  // let pathname: string
  // if (location && location.state && location.state.from) {
  //   pathname = location.state.from.pathname
  // }
  return (
    <QrLogin
      title={'Mobile Login'}
      value={getWalletListCommand()}
      onScan={data => scanLoginData(data)}
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
