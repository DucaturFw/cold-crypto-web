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
} from '../components/atoms'
import styled from 'react-emotion'

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

export const Select = styled('select')(
  ({ flipToRight }: { flipToRight: boolean }) => ({
    ':after': {
      border: 'solid white',
      borderWidth: '0 3px 3px 0',
      content: '""',
      position: 'absolute',
    },
    appearance: 'none',
    background: '#457b9d',
    border: 0,
    borderRadius: flipToRight ? '0 .2rem .2rem 0' : '.2rem',
    color: '#f1faee',
    padding: '0 1rem',
    boxSizing: 'border-box',
    position: 'relative',
    margin: '.25rem 0',
  })
)
