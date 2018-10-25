import React from 'react';
import {connect} from 'react-redux'
import QRCode from 'qrcode.react'
import { Container, Column, Row } from '../shared/layout'
import { H1 } from '../shared/typography'
import { initWebrtcConnaction } from '../../actions'
const hostUrl = "ws://localhost:3077"

class WebrtcServer extends React.Component {
  state = {
    sessionId: null
  }

  componentDidMount = async () => {
    const { initWebrtcConnaction, webrtc } = this.props
    const offer = await  webrtc.createOffer()
    let ws = new WebSocket(hostUrl)
    ws.addEventListener('open', () =>
    {
      console.log('opened!')
      ws.send(JSON.stringify({ jsonrpc: "2.0", id: 1, method: "offer", params: { offer: offer.sdp } }))
    })
    ws.addEventListener('message', async (data) =>
    {
      console.log(`message: ${data.data}`)
      let json = JSON.parse(data.data.toString())
      if(json.id == 1) {
        this.setState({sessionId: json.result.sid})
      }

      if (json.method == 'ice') {
        webrtc.pushIceCandidate(json.params.ice)
      }

      if(json.method === 'answer') {
        webrtc.on('ice', ice => {
          ws.send(JSON.stringify({ jsonrpc: "2.0", id: 2, method: "ice", params: { ice: ice } }))
        })

        await webrtc.pushAnswer({ type: "answer", sdp: json.params.answer })
        
        console.log('wait connection')

        await webrtc.waitConnection()
        initWebrtcConnaction()
        webrtc.dataChannel.send(`getWalletList|2|[ ["eth"] ]`)
        ws.close()
      }
      
    })
  }

  render() {
    const { sessionId } = this.state
    const qrcodeDate = `webrtcLogin|1|{"sid":${sessionId},"url":${hostUrl}}`

    return (
      <Container>
         <Row>
          {sessionId && <Column>
            <H1>Scan session id</H1>
            <QRCode
              value={ JSON.stringify(qrcodeDate) }
              renderAs='svg'
              size='100%'
            />
            </Column>}
        </Row>
      </Container>
    )
  }
}

export default connect( state => ({ webrtc: state.webrtc }), { initWebrtcConnaction } )(WebrtcServer)