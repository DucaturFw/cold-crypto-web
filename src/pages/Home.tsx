import * as React from 'react'
import {
  Row,
  H2,
  H3,
  Column,
  Hr,
  ButtonBase,
  ButtonSecondary,
  TextInput,
  Link,
  Select,
} from '../components/atoms'


export const Home: React.SFC<{}> = () => (
  <React.Fragment>
    <H2>Welcome Back!</H2>
    <H3>Sign in to your wallet below</H3>
    <Hr />

    <Row>
      <Column
        style={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '1rem',
        }}
      >
        <Row>
          <Link to="/login">
            <ButtonBase>Login using QR code</ButtonBase>
          </Link>
        </Row>
        <Row>
          <Link to="/login?rtc=true">
            <ButtonSecondary>Webrtc login</ButtonSecondary>
          </Link>
        </Row>
      </Column>
      <Column style={{ width: '50%' }}>
        <Row>
          <TextInput type="text" placeholder="Type your wallet address here" />
          <Select flipToRight>
            <option value="eth" key="eth">
              'eth
            </option>
          </Select>
        </Row>
        <Row>
          <ButtonSecondary>Login with address</ButtonSecondary>
        </Row>
      </Column>
    </Row>
  </React.Fragment>
)
