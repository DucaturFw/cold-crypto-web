import React, { Component } from "react";
import { Link } from "fuse-react";

import { Container, Column } from "./layout";
import { connect } from "react-redux";
import { IRootState } from "../reducers/index.main";

class WalletList extends Component<any, any> {
  state = {
    list: []
  };

  componentWillMount() {
    const list = [
      { symbol: "eth", address: "0x00", balance: 1500 },
      { symbol: "eth", address: "0x01", balance: 12500 }
    ];

    localStorage.setItem("walletsList", JSON.stringify(list));
    this.setState({ list });
  }

  render() {
    const { walletList } = this.props;
    console.log(this.props);
    return (
      <Container>
        <Column>
          {walletList.map(v => (
            <Link
              to={`/wallet/${v.blockchain}/${v.address}`}
              key={v.address}
            >{`${v.blockchain}: ${v.address}`}</Link>
          ))}
        </Column>
      </Container>
    );
  }
}

function mapStateToProps(state: IRootState) {
  return {
    walletList: state.WalletList
  };
}

export default connect(
  mapStateToProps,
  null
)(WalletList);
