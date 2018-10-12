import React from 'react'
import { Link } from 'fuse-react'

import { Container, Centered, Row } from './layout'
import fetch from 'fetch-hoc'

const SupportedCurrenciesList = fetch('http://localhost:4443/blockchains')(
  ({ data }) => (
    <select>
      { (data && data.supported || []).map(v => (
        <option value={v} key={v}>{v}</option>
      ))}
    </select>
  )
)

const Home = () => (
  <Container>
    <Centered>
      <Link to='/login'><button>Login with Cold Crypto Mobile App</button></Link>
      <br />
      or
      <br />
      <Row>
        <div>Login with public key:</div>
        <SupportedCurrenciesList />
        <input type='text' placeholder='Address' />
        <button>Add</button>
      </Row>
      <br/>
      <Link to='/wallets'><button>To wallets list</button></Link>
    </Centered>
  </Container>
)

export default Home