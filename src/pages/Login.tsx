import * as React from 'react'
import { connect } from 'react-redux'

import { setWebRtcQrAnswer } from '../store/webrtc/actions'

import { QrLogin } from '../components/organisms/QrLogin'

import { IApplicationState } from '../store'

// TODO: map errorfrom qrcode state and show if we will have it
interface IPropsFromState {
  search: IApplicationState['router']['location']['search']
  qrRequest: IApplicationState['webrtc']['qrRequest']
}

interface IPropsFromDispatch {
  setWebRtcQrAnswer: typeof setWebRtcQrAnswer
}

const LoginPage = ({ qrRequest, setWebRtcQrAnswer: setAnswer }: IPropsFromState & IPropsFromDispatch) =>
  <QrLogin
    title={'Mobile Login'}
    value={qrRequest || ''}
    onScan={setAnswer}
    readonly={false}
  />

const mapStateToProps = ({
  router: { location: { search } },
  webrtc: { qrRequest }
}: IApplicationState) => ({
  qrRequest, search
})

const mapDispatchToProps = { setWebRtcQrAnswer }

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
