import React, { Fragment } from "react";
import fetch from "fetch-hoc";
import { Value } from "react-powerplug";
import QRCode = require("qrcode.react");
import Web3 from "web3";
import QrReqder from "react-qr-reader";

import { mapProps, lifecycle } from "recompact";

const handleOnScan = result => {
  try {
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const QrImg = lifecycle({
  componentWillMount: () => console.log("will mount")
})(({ data }: { data: string }) => (
  <Value initial="">
    {({ value, set }) => {
      return (
        <Fragment>
          <QRCode value={value} renderAs="svg" size={310} />
        </Fragment>
      );
    }}
  </Value>
));

const TxSigned = ({ value }) => {
  return (
    <div>
      <span>Signed {JSON.stringify(value)}</span>
      test
      <QrImg data={JSON.stringify(value)} />
      <QrReqder
        delay={300}
        onScan={result => result && handleOnScan(result)}
        onError={error => {}}
        style={{ width: "50%" }}
      />
    </div>
  );
};

const withSignPush = mapProps(props => ({
  ...props,
  withSignPush: fetch(
    "http://localhost:4443/eth/pushTx",
    ({ value: { gasPrice, to, amount } }) => ({
      method: "POST",
      body: JSON.stringify({
        chainId: 1,
        data: "0x",
        gasLimit: "0x5208",
        gasPrice: Web3.utils.toWei(gasPrice, "gwei"),
        nonce: Web3.utils.toHex(Date.now()),
        to,
        value: Web3.utils.toWei(amount.toString())
      })
    })
  )
}));

export default withSignPush(TxSigned);
