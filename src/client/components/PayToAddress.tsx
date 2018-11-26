import React from 'react'
import { ButtonBase } from './shared/buttons'
import { H1, H2 } from './shared/typography'
import { Form } from 'react-powerplug'
import web3 from 'web3'
import { Column, Container, Header, Row, Centered } from './shared/layout'
import { TextInput } from './shared/inputs'
import { payToAddress } from './../helpers/webrtc'

class PayToAddress extends React.Component<any> {
  state = {
    blockChainData: {
      avgWait: 0
    },
    blockChainPrice: 0
  }
  componentDidMount() {
    fetch(`https://cors-anywhere.herokuapp.com/https://ethgasstation.info/json/ethgasAPI.json`)
      .then((res) => res.json())
      .then((json) => this.setState({blockChainData: json}))
    fetch(`https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/ticker/ethereum/`)
      .then((res) => res.json())
      .then((json) => this.setState({blockChainPrice: json[0].price_usd}))
  }

  render() {
    const { match: { params: { address } } } = this.props
    const { blockChainData, blockChainPrice} = this.state
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
    const data = urlParams.get('data');
    const callback = urlParams.get('callback');
    const initialValue = {
      gasPrice: "1",
      to: address,
      amount: amount,
      data: data,
      callback: callback,
      blockchain: 'eth',
    }
    return (
      <>
      <Header to='/' />
      <Container>
        <Centered style={{ maxWidth: '80vw' }}>
            <Form initial={initialValue} >
            {({ field, values }) => (
              <form onSubmit={(e) => {
                e.preventDefault()

              const command = payToAddress(values)
              console.log(command)
              window.location.href = `coldcrypto://connect?qr=${command}`
              }}>
                <Column>
                  <H1>Tx sent data</H1>
                  <H2>Address: {address}</H2>
                  <H2>Amount: {amount}</H2>
                  <H2>Data: {data}</H2>
                  <Row>
                    <span>Gas price {values.gasPrice} GWEI</span>
                    <TextInput type='range' {...field('gasPrice').bind} min='1' max='100' />
                    <span> {(Number(web3.utils.fromWei(values.gasPrice, "gwei")) * 21000 * Number(blockChainPrice)).toFixed(3)} USD</span>
                    <span style={{minWidth: '5rem', marginLeft: '.5rem'}}> {`< ${(Number(blockChainData.avgWait) * Number(values.gasPrice)).toFixed(2)} min`}</span>
                  </Row>
                  <ButtonBase type='submit'>Pay</ButtonBase>
                </Column>
              </form>
            )}
          </Form>
          
        </Centered>
      </Container>
    </>
    )
  }
}
 export default PayToAddress
 