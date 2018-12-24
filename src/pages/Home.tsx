import * as React from 'react'
import {
  Row,
  H2,
  H3,
  Column,
  Hr,
  ButtonBase,
  ButtonSecondary,
  Link,
} from '../components/atoms'

export const Home: React.SFC<{}> = () => (
  <div style={{ width: '38rem' }}>
    <H2>Welcome!</H2>
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
        <Link to="/login">
          <ButtonBase>Airgapped login</ButtonBase>
        </Link>
      </Column>
      <Column
        style={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '1rem',
        }}
      >
        <Link to="/login?rtc=true">
          <ButtonSecondary>Online login</ButtonSecondary>
        </Link>
      </Column>
    </Row>
  </div>
)
