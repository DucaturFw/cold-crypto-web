import React, { Component } from "react";
import { Link } from "fuse-react";

import { Container, Column } from "./layout";
import { connect } from "react-redux";

class WalletList extends Component {
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
    console.log(this.props, "111111");
    return (
      <Container>
        <Column>
          {this.state.list.map(v => (
            <Link to={`/wallet/${v.symbol}/${v.address}`} key={v.address}>{`${
              v.symbol
            }: ${v.address} | ${v.balance}`}</Link>
          ))}
        </Column>
      </Container>
    );
  }
}

export default connect(
  state => ({
    state: state
  }),
  null
)(WalletList);
