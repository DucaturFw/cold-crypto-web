import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { Row, H2, ButtonClose, H1, Hr } from '../components/atoms'
import styled from 'react-emotion'

interface IPropsFromState {
  status: string
}

interface IPropsFromDispatch {}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

const StatusPage: React.SFC<AllProps> = ({ status }) => (
  <React.Fragment>
    {status}
    <Row>
      <H1>Tx sent result</H1>
      <ButtonClose />
    </Row>
    <Hr />
    <LoadingText>Status : {status}</LoadingText>
  </React.Fragment>
)

const mapStateToProps = ({ webrtc }: IApplicationState) => ({
  status: webrtc.status,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export const Status = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusPage)

const LoadingText = styled(H2)`
  &:after {
    content: ' .';
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    20% {
      color: rgba(0, 0, 0, 0);
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    40% {
      color: black;
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    60% {
      text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    80%,
    100% {
      text-shadow: 0.25em 0 0 black, 0.5em 0 0 black;
    }
  }
`
