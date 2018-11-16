import React from 'react'
import {connect} from 'react-redux'
import QRCode from 'qrcode.react'
import { Container, Centered, Column, Row, Header } from '../shared/layout'
import { H1 } from '../shared/typography'
import { initWebrtcConnaction } from '../../actions'
import { handshakeServerUrl } from '../../constants'
import { getWalletList, webrtcLogin } from '../../helpers/webrtc'

class WebrtcServer extends React.Component {
  public state = {
    sid: null,
  }

  public componentDidMount = async () => {
    const { initWebrtcConnaction, webrtc } = this.props
    const offer = await  webrtc.createOffer()
    const ws = new WebSocket(handshakeServerUrl)

    ws.addEventListener('open', () =>
    {
      console.log('opened!')
      ws.send(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'offer', params: { offer: offer.sdp } }))
    })
    ws.addEventListener('message', async (data) =>
    {
      console.log(`message: ${data.data}`)
      const json = JSON.parse(data.data.toString())
      if (json.id === 1) {
        this.setState({sid: json.result.sid})
      }

      if (json.method === 'ice') {
        webrtc.pushIceCandidate(json.params.ice)
      }

      if (json.method === 'answer') {
        webrtc.on('ice', (ice) => {
          ws.send(JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'ice', params: { ice } }))
        })

        await webrtc.pushAnswer({ type: 'answer', sdp: json.params.answer })

        console.log('wait connection')

        await webrtc.waitConnection()
        initWebrtcConnaction()
        webrtc.dataChannel.send(getWalletList())
        ws.close()
      }

    })
  }

  public render() {
    const { sid } = this.state

    return (
      <>
        <Header to='/' />
        <Container>
          <Centered>
            <Row>
              {sid && <Column>
                <H1>Scan session id</H1>
                <QRCode
                  value={ webrtcLogin(sid) }
                  renderAs='svg'
                  style={{width: '100%', height: '100%'}}
                />
                </Column>}
            </Row>
          </Centered>
        </Container>
      </>
    )
  }
}

export default connect( (state: any) => ({ webrtc: state.webrtc.webrtc }), { initWebrtcConnaction } )(WebrtcServer)