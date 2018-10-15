import { all, fork, take, call, put } from "redux-saga/effects";
import { navigate } from "fuse-react";

import qrcode from "qrcode";
import RTCHelper from "../services/webrtc";

import { generateQr, setQr, setQrScanned } from "../actions";

function* rtc() {
  const mobileClient = async () => {
    const p2 = new RTCHelper("mobile");
    await p2.waitConnection();
  };

  const connect = async () => {
    const p1 = new RTCHelper("host");
    const offer = await p1.createOffer();
    console.log(offer);
    await p1.waitConnection();
    console.log(`connected (definitely, maybe)`);
    p1.dataChannel!.send("hello");
  };
}

function* watchForQRScan() {
  yield put(setQrScanned(Error("FOO")));
  while (true) {
    try {
      const { payload } = yield take(setQrScanned);
      console.log(JSON.parse(payload), "33333");
      console.log(payload, "test 333");
      if (!Array.isArray(JSON.parse(payload)))
        throw Error("Scanned data is not an Array");
      else {
        console.log("Lox test");
        navigate("/wallets");
      }
    } catch (err) {
      yield put(setQrScanned(err));
    }
  }
}

function* genQr() {
  const {
    payload: { key, value }
  } = yield take(generateQr);
  const qr = yield call(qrcode.toDataURL, value);
  yield put(setQr({ key, value: qr }));
}

export default function* rootSaga() {
  yield all([fork(genQr), fork(watchForQRScan)]);
}
