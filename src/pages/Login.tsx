import * as React from 'react'
import QRCode from 'qrcode.react'
import QrReader from 'react-qr-reader'
import {
  Row,
  H2,
  H3,
  Column,
  ButtonClose,
  Centered,
  Hr,
} from '../components/atoms'
import { connect } from 'react-redux'

const LoginPage: React.SFC<{}> = () => (
  <React.Fragment>
    <Row>
      <Column>
        <H2>Mobile Login</H2>
        <H3>
          Follow these steps to log into your web wallet using your mobile
          device
        </H3>
      </Column>
      <ButtonClose />
    </Row>
    <Hr />
    <Row>
      <Column style={{ width: '50%' }}>
        <Centered>
          <H2>Scan QR Code</H2>
        </Centered>
        <Centered style={{ display: 'flex' }}>
          <div style={{ height: '30vh', width: '30vh' }}>
            <QRCode value={'test'} renderAs="svg" />
          </div>
        </Centered>
      </Column>
      <Column style={{ width: '50%' }}>
        <Centered>
          <H2>Show QR Code</H2>
        </Centered>
        <Centered style={{ display: 'flex' }}>
          <QrReader
            delay={300}
            onScan={(result: string | null) => result && console.log(result)}
            onError={(error: string) => console.log(error)}
            style={{ width: '30vh' }}
          />
        </Centered>
      </Column>
    </Row>
  </React.Fragment>
)

export const Login = connect(
  null,
  null
)(LoginPage)
