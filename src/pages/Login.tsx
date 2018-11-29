import * as React from 'react'
import {
  Row,
  H2,
  H3,
  Column,
  ButtonClose,
  Centered,
  Hr,
} from '../components/atoms'

export const Login: React.SFC<{}> = () => (
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
          {/* <QRCode
          value={ getWalletList() }
          renderAs='svg'
          style={{width: '30vh', height: '30vh'}}
        /> */}
        </Centered>
      </Column>
      <Column style={{ width: '50%' }}>
        <Centered>
          <H2>Show QR Code</H2>
        </Centered>
        <Centered style={{ display: 'flex' }}>
          {/* <QrReader
          delay={300}
          onScan={(result: string) => result && props.scanWallets(parseJsonString(result.substr(3)))}
          onError={(error: string) => props.scanWallets(Error(error))}
          style={{ width: '30vh' }}
        /> */}
        </Centered>
      </Column>
    </Row>
  </React.Fragment>
)
