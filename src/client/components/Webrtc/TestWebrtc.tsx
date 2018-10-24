import React from 'react';
import RTCHelper from '../../services/webrtc'
import QRCode from 'qrcode.react'
import { Container, Column, Row } from '../shared/layout'
import { H1 } from '../shared/typography'

class Webrtc extends React.Component {
  state = {
    offer: '',
    rpc: RTCHelper,
    connected: false,
    answer: null,
    sessionId: null
  }

  componentDidMount = async () => {
    const { rpc } = this.state;
    const offer = await  rpc.createOffer()
    let ws = new WebSocket('ws://localhost:3077')
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
        rpc.pushIceCandidate(json.params.ice)
      }

      if(json.method === 'answer') {
        rpc.on('ice', ice => {
          ws.send(JSON.stringify({ jsonrpc: "2.0", id: 2, method: "ice", params: { ice: ice } }))
        })

        await rpc.pushAnswer({ type: "answer", sdp: json.params.answer })
        
        console.log('wait connection')

        await rpc.waitConnection()

        ws.close()
      }
      
    })
  }

  render() {
    const { sessionId } = this.state
    return (
      <Container>
         <Row>
          {sessionId && <Column>
            <H1>Scan session id</H1>
            <QRCode
              value={ JSON.stringify(sessionId) }
              renderAs='svg'
              size='100%'
            />
            </Column>}
        </Row>
      </Container>
    )
  }
}

export default Webrtc;