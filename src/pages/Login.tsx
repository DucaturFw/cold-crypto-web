import * as React from 'react'
import { QrLogin } from '../components/atoms'

import { getWalletListCommand } from '../helpers/jsonrps'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { login } from '../store/transport/actions'
import { IConnectedReduxProps, IApplicationState } from '../store'

// TODO: map errorfrom qrcode state and show if we will have it
interface IPropsFromState {
  search: string
}

interface IPropsFromDispatch {
  scanLoginData: typeof login
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

const LoginPage: React.SFC<AllProps> = ({ scanLoginData, search }) => {
  const isRtc = new URLSearchParams(search).get('rtc') as any

  return (
    <React.Fragment>
      <QrLogin
        title={'Mobile Login'}
        value={getWalletListCommand()}
        onScan={scanLoginData}
        readonly={isRtc}
      />
    </React.Fragment>
  )
}

const mapStateToProps = ({ router }: IApplicationState) => ({
  search: router.location.search,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  scanLoginData: (data: string) => dispatch(login(data)),
})

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
