import React from 'react';
import RTCHelper from '../../services/webrtc'
import { parseJsonString } from '../../helpers/json';

class Webrtc extends React.Component {
  state = {
    offer: '',
    rpc: RTCHelper,
    connected: false,
    answer: null
  }

  componentDidMount = async () => {
    const { rpc } = this.state;
    const offer = await  rpc.createOffer()
    let ws = new WebSocket('ws://localhost:3077')
    ws.addEventListener('open', () =>
    {
      console.log('opened!')
      // ws.send(JSON.stringify({ jsonrpc: "2.0", id: 1, method: "offer", params: { offer: offer } }))
      ws.send(JSON.stringify({ jsonrpc: "2.0", id: 1, method: "offer", params: { offer: offer.sdp } }))
    })
    ws.addEventListener('message', async (data) =>
    {
      console.log(`message: ${data.data}`)
      let json = JSON.parse(data.data.toString())

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
    return null
  }
}

export default Webrtc;