import React from 'react'
import QrReader from 'react-qr-reader'
import { connect } from 'react-redux'

import { Header, Centered, Container, Column, Row } from './shared/layout'
import { H2 } from './shared/typography'

import { scanWallets } from '../actions'
import { parseJsonString } from '../helpers/json'
import QRCode from 'qrcode.react'
import { getWalletList } from './../helpers/webrtc'

const Login = (props: { scanWallets: typeof scanWallets, match: { params: { address } } }) => {
  return (
    <>
      <Header to='/' />
      <Container>
        <Row style={{ width: '100vw' }}>
          <Column style={{ width: '40%', margin: '0 5%' }}>
            <Centered>
              <H2>Scan QR Code</H2>
            </Centered>
            <Centered style={{display: 'flex'}}>
              <QRCode
                value={ getWalletList() }
                renderAs='svg'
                style={{width: '40vh', height: '40vh'}}
              />
            </Centered>
          </Column>
          <Column style={{ width: '40%', margin: '0 5%' }}>
            <Centered>
              <H2>Show qrcode</H2>
            </Centered>
            <Centered style={{display: 'flex'}}>
              <QrReader
                delay={300}
                onScan={(result) => result && props.scanWallets(parseJsonString(result.substr(3)))}
                onError={(error) => props.scanWallets(Error(error))}
                style={{ width: '40vh' }}
              />
            </Centered>
          </Column>
        </Row>
      </Container>
    </>
  )
}


export default connect(null, { scanWallets })(Login)
