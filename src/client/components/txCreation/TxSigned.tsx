import React, { Fragment } from "react";
import fetch from "fetch-hoc";
import { Value } from "react-powerplug";
import Web3 from "web3";
import { mapProps, lifecycle } from "recompact";

const QrImg = lifecycle({
  componentWillMount: () => console.log("will mount")
})(({ data }: { data: string }) => (
  <Value initial="">
    {({ value, set }) => {
      // return qrcode.toDataURL(data).then((v) => <img src={v} alt='' />)
      return (
        <Fragment>
          <img src={value} alt="" />
        </Fragment>
      );
    }}
  </Value>
));

const TxSigned = ({ value }) => {
  // connect()
  return (
    <div>
      <span>Signed {JSON.stringify(value)}</span>
      test
      <QrImg data={'{"FOO": "bAR"}'} />
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
