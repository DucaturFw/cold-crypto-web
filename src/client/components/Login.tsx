import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QrReqder from "react-qr-reader";

import * as WalletActions from "../actions/wallet";

import { Container } from "./layout";

const Login = props => {
  console.log(props);
  return (
    <Container>
      <h1>Scan QR Code</h1>
      <QrReqder
        delay={300}
        onScan={result => result && props.actions.addWallet(result)}
        onError={error => {}}
        style={{ width: "100%" }}
      />
    </Container>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(WalletActions as any, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Login);
