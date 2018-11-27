import React from 'react'
import { Column, Container, Centered, Header } from '../components/shared/layout'
import { H1, H2 } from './shared/typography'
import { connect} from 'react-redux'

const TxView = ({error, lastTransaction : tx}) => {
  return (
    <>
      <Header to='/' />
      <Container>
        <Centered>
          <Column>
            <H1>Tx sent result</H1>
            {error
              ? (<H2>{error}</H2>)
              : (
                <>
                  {tx.to && <H2>To : {tx.to}</H2>}
                  <H2>Tx hash : {tx.transactionHash}</H2>
                  <a target='_blank' href={`https://rinkeby.etherscan.io/tx/${tx.transactionHash}`}>
                    {tx.transactionHash}
                  </a>
                </>
              )
            }
          </Column>
        </Centered>
      </Container>
    </>
  )
}

export default connect( (state: any) => state.webrtc)(TxView)
