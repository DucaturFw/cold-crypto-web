import { fork, all, take, select, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

import connectSaga from './connectSaga'
import { IApplicationState } from '..'
import parseMessage from '../../utils/parseMessage'
import { RTCCommands } from '../../constants'
import { login } from '../transport/actions'

function* createEventChannel(rtc: any) {
  return eventChannel(emit => {
    rtc.dataChannel.onmessage = (message: any) => emit(message.data)
    return () => {
      console.log('====================================')
      console.log('111111', rtc)
      console.log('====================================')
      rtc.close()
    }
  })
}

function* watchDataChannel() {
  const rtc = yield select((state: IApplicationState) => state.webrtc.rtc)
  const channelMessage = yield call(createEventChannel, rtc)

  console.log(channelMessage, 1111111)
  while (true) {
    const message = yield take(channelMessage)

    const { id } = parseMessage(message)
    switch (id) {
      case RTCCommands.getWalletList:
        yield login(channelMessage)
        break
      // case RTCCommands.signTransferTx:
      //   yield put(setScanResult(message));
      //   break;
      // case RTCCommands.signContractCall:
      //   yield put(setScanResult(message));
      //   break;
      default:
        break
    }
  }
}

function* webrtcSaga() {
  yield all([fork(connectSaga), fork(watchDataChannel)])
}

export default webrtcSaga

// function* webrtcSagasss() {
//   const rtc = yield select((state: IApplicationState) => state.webrtc.rtc)

//   const offer = yield call(rtc.createOffer)

//   // Init WebRTC connection
//   yield fork(connectSaga, rtc, offer)

//   // // Choose method of login based on webrtc connection
//   // const { qrMethod, webrtcMethod } = yield race({
//   //   qrMethod: delay(3000),
//   //   webrtcMethod: take(setWebRtcConnectionSid),
//   // })

//   // if (webrtcMethod) console.log('Ready to webrtc connection')

//   // if (qrMethod) console.log('No webrtc connection, use QR login instead')

//   // const { payload: qrAnswer } = yield take(setQrAnswer)

//   // yield call(rtc.pushAnswer, qrAnswer /*answer*/)
//   // yield call(rtc.waitConnection)

//   // cataChannel logic
//   // const jrpcCall = yield call(dataChannelSaga, rtc.dataChannel)

//   // while (true) {
//   //   // Waiting for UI request to JRPC
//   //   const {
//   //     payload: { method, data },
//   //   } = yield take(requestJRPC)
//   //   // Pass request to saga and don't block loop for other requests
//   //   yield fork(jsonRPCCallSaga, jrpcCall, method, data)
//   // }
// }

// // function* jsonRPCCallSaga<T extends unknown, U extends unknown>(
// //   jrpcCall: (method: string, data: T) => U,
// //   method: string,
// //   data: T
// // ) {
// //   const response: U = yield call(jrpcCall, method, data)
// //   // Notify store and UI about response
// //   yield put(setResponseJRPC({ method, data, response }))
// // }

// // function* dataChannelSaga(dataChannel: RTCDataChannel) {
// //   let lastMsgId = 0

// //   const msgChan = eventChannel(emitter => {
// //     dataChannel.onmessage = (msg: MessageEvent) => emitter(msg.data)
// //     return dataChannel.close
// //   })

// //   return function*(method: string, params: any) {
// //     const id = lastMsgId++
// //     dataChannel.send(JSON.stringify({ id, method, params }))

// //     while (true) {
// //       const resp = yield take(msgChan)
// //       if (resp.id === id) return resp
// //     }
// //   }
// // }
