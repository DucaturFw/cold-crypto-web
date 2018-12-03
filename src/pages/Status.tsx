import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, IConnectedReduxProps } from '../store'

interface IPropsFromState {
  status: string
}

interface IPropsFromDispatch {}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

const StatusPage: React.SFC<AllProps> = ({ status }) => (
  <React.Fragment>{status}</React.Fragment>
)

const mapStateToProps = ({ webrtc }: IApplicationState) => ({
  status: webrtc.status,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export const Status = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusPage)
