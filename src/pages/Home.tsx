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
  SelectFloat,
} from '../components/atoms'


export const Home: React.SFC<{}> = () => (
  <div style={{ width: '38rem' }}>
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
          <Link to="/login" style={{ width: '100%' }}>
            <ButtonBase>Login with QR code</ButtonBase>
          </Link>
        </Row>
        <Row>
          <Link to="/login?rtc=true" style={{ width: '100%' }}>
            <ButtonSecondary>Webrtc login</ButtonSecondary>
          </Link>
        </Row>
      </Column>
      <Column style={{ width: '50%' }}>
        <Row>
          <TextInput type="text" placeholder="Type your wallet address here" />
          <SelectFloat flipToRight>
            <option value="eth" key="eth">
              'eth
            </option>
          </SelectFloat>
        </Row>
        <Row>
          <ButtonSecondary>Login with address</ButtonSecondary>
        </Row>
      </Column>
    </Row>
  </div>
)
