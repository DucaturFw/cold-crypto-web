import React from 'react'
import { Link } from 'fuse-react'
import { Column, Container, Centered, Header } from '../components/shared/layout'
import { ButtonBase } from './shared/buttons'
import { H1, H2 } from './shared/typography'
import {setPayData} from '../actions'
import { connect} from 'react-redux'

const Pay = ({ match: { params: { address } }, setPayData }) => {
  //TODO: rewrite it
  const urlParams = new URLSearchParams(window.location.search);
  const amount = urlParams.get('amount');
  const data = urlParams.get('data');

  setPayData({to: address, amount, data})
  return (
    <>
      <Header to='/' />
      <Container>
        <Centered>
          <Column>
            <H1>Tx sent data</H1>
            <H2>Address: {address}</H2>
            <H2>Ammount: {amount}</H2>
            <H2>Data: {data}</H2>
          </Column>
          <Link to='/login'>
            <ButtonBase>Login and pay</ButtonBase>
          </Link>
        </Centered>
      </Container>
    </>
  )
}

export default connect( (state: any) => state.webrtc, {setPayData})(Pay)
