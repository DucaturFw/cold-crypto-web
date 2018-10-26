import React from 'react'
import QRCode from 'qrcode.react'
import { Container, Column, Row } from '../shared/layout'
import { H1 } from '../shared/typography'

interface ICandidates {
  candidates: RTCIceCandidate[]

}

class Candidates extends React.Component<ICandidates> {
  state = {
    timerId: null,
    candidate: ''
  }

  componentDidMount() {
    const {candidates} = this.props
    let index = 0
    const length = candidates.length;

    var timerId = setInterval(() => {            
      this.setState({ candidate: candidates[index]})

      index = index < length - 1 ? index + 1 : 0
    }, 1500);

    this.setState({timerId})
  }

  componentWillUnmount() {
    const {timerId} = this.state
    clearInterval(timerId)
  }

  render() {
    const { candidate } = this.state

    return (
      <Container>
        <Row style={{ minWidth: '80vw' }}>
          <Column style={{ width: '45%', marginRight: '5%' }}>
            <H1>Scan candidate</H1>
            {candidate && <QRCode
              value={ JSON.stringify(candidate) }
              renderAs='svg'
              style={{width: '100%', height: '100%'}}
            />}
          </Column>
        </Row>
      </Container>
    )
  }
}

export default  Candidates
